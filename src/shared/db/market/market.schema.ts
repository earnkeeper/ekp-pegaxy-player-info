import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'market' })
export class Market {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly created: string;

  @Column()
  readonly updated: string;

  @Column()
  readonly buyer_address: string;

  @Column()
  readonly price: number;

  @Column()
  readonly price_token_id: string;

  @Column()
  readonly pega_token_id: string;
}