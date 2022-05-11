import {
  CacheService,
  EkConfigService,
  logger,
} from '@earnkeeper/ekp-sdk-nestjs';
import retry, { Options } from 'async-retry';
import axios, { AxiosResponse } from 'axios-https-proxy-fix';
import Bottleneck from 'bottleneck';

export class ApiBuilder {
  constructor(
    private configService: EkConfigService,
    private cacheService: CacheService,
    private options?: { defaultLimit: Bottleneck.ConstructorOptions },
  ) {}

  private limiter: Bottleneck;
  private ttl: number;
  private enableRetry: boolean;
  private retryOptions: Options;

  proxy() {
    return this;
  }

  limit(limitOptions?: Bottleneck.ConstructorOptions) {
    let options: Bottleneck.ConstructorOptions =
      limitOptions ?? this.options.defaultLimit;

    if (!!options.id) {
      options = {
        ...options,
        datastore: 'ioredis',
        clientOptions: {
          host: this.configService.redisHost,
          port: this.configService.redisPort,
          username: this.configService.redisUser,
          password: this.configService.redisPassword,
        },
        clearDatastore: true,
      };
    }

    this.limiter = new Bottleneck(options);

    return this;
  }

  retry(options?: Options) {
    this.enableRetry = true;
    this.retryOptions = options;
    return this;
  }

  cache(ttl: number) {
    this.ttl = ttl;
    return this;
  }

  async get<T>(
    url: string,
    handler: (response: AxiosResponse) => T,
  ): Promise<T> {
    if (!!this.ttl) {
      const cachedValue = await this.cacheService.get<T>(url);
      if (cachedValue !== null && cachedValue !== undefined) {
        return cachedValue;
      }
    }

    logger.debug(`${url}`);

    const getter = async (url: string) => {
      const response = await axios.get(url);

      const result = await handler(response);

      if (!!this.ttl) {
        await this.cacheService.set(url, result, { ttl: this.ttl });
      }

      return result;
    };

    if (this.enableRetry) {
      return retry<T>(async () => {
        if (!!this.limiter) {
          return this.limiter.schedule(getter, url);
        }

        return getter(url);
      }, this.retryOptions);
    }

    if (!!this.limiter) {
      return this.limiter.schedule(getter, url);
    }

    return getter(url);
  }

  async page<T>(
    urlMapper: (cursor: string | number) => string,
    handler: (
      response: AxiosResponse,
      cursor: string | number,
    ) => {
      cursor: string | number;
      results: T[];
      done: boolean;
    },
    initialCursor?: string | number,
  ): Promise<T[]> {
    let cursor = initialCursor;
    const results = [];

    while (true) {
      const url = urlMapper(cursor);
      const next = await this.get(url, (response) => handler(response, cursor));

      results.push(...next.results);

      if (next.done) {
        return results;
      }

      cursor = next.cursor;
    }
  }
}
