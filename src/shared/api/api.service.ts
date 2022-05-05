import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';

@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };

  constructor() {
    super({
      name: 'PegaxyApiService',
    });

   
  }

}
