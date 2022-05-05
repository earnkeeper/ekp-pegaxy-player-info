import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class PlayerDocument extends DocumentDto {
  constructor(properties: PlayerDocument) {
    super(properties);
  }
  readonly cardArtUrl: string;
  readonly god: string;
  readonly mana: number;
  readonly name: string;
  readonly rarity: string;
  readonly set: string;
}
