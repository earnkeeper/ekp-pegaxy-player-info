import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class InfoDocument extends DocumentDto {
  constructor(properties: InfoDocument) {
    super(properties);
  }
  readonly cardArtUrl: string;
  readonly god: string;
  readonly mana: number;
  readonly name: string;
  readonly rarity: string;
  readonly set: string;
}
