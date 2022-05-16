import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketNotificationDocument extends DocumentDto {
  constructor(properties: MarketNotificationDocument) {
    super(properties);
  }

  readonly bloodline?: string;
  readonly breedType?: number;
  readonly breedMin?: number;
  readonly breedMax?: number;
  readonly gender?: string;
  readonly priceMin?: number;
  readonly priceMax?: number;
  readonly alertAddress: number;
  readonly alertDiscordId: number;
}
