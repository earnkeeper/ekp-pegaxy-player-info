import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class PegaDocument extends DocumentDto {
  constructor(properties: PegaDocument) {
    super(properties);
  }
  readonly pegaId: number;
  readonly name: string;
  readonly cost: number;
  readonly marketValue: number;
  readonly placeRate: number;
  readonly totalRaces: number;
  readonly earned: number;
  readonly fiatSymbol: string;
}
