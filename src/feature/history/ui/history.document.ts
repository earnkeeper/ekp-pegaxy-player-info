import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class HistoryDocument extends DocumentDto {
  constructor(properties: HistoryDocument) {
    super(properties);
  }
  readonly cardArtUrl: string;
  readonly god: string;
  readonly mana: number;
  readonly name: string;
  readonly rarity: string;
  readonly set: string;
}
