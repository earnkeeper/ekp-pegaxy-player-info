import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'market_buys' })
export class MarketBuy {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: 'timestamptz' })
  readonly created: Date;

  @Column({ type: 'timestamptz' })
  readonly updated: Date;

  @Column()
  readonly buyer_address: string;

  @Column()
  readonly price: string;

  @Column()
  readonly price_coin_id: string;

  @Column()
  readonly pega_token_id: number;
}
