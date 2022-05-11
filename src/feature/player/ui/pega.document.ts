import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class PegaDocument extends DocumentDto {
  constructor(properties: PegaDocument) {
    super(properties);
  }

  readonly address: string;
  readonly earnedVisFiat: number;
  readonly earnedVis: number;
  readonly fiatSymbol: string;
  readonly pegasOwned: number;
}
