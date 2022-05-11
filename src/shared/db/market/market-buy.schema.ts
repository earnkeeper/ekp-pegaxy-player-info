import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Pega } from '../pega/pega.schema';

@Entity({ name: MarketBuy.TABLE_NAME })
export class MarketBuy {
  static TABLE_NAME = 'market_buys';

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

  @OneToOne(() => Pega)
  @JoinColumn({ name: 'pega_token_id', referencedColumnName: 'id' })
  readonly pega?: Pega;
}
