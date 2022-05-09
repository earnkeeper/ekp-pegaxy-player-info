import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pegas' })
export class Pega {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: 'timestamptz' })
  readonly created: Date;

  @Column({ type: 'timestamptz' })
  readonly updated: Date;

  @Column()
  readonly name: string;

  @Column()
  readonly cost: string;

  @Column()
  readonly cost_coin_id: string;

  @Column()
  readonly market_value: string;

  @Column()
  readonly market_value_coin_id: string;

  @Column()
  readonly earned_to_date: string;

  @Column()
  readonly earned_to_date_coin_id: string;

  @Column()
  readonly place_rate: number;

  @Column()
  readonly total_races: number;

  @Column()
  readonly owner_player_id: string;
}
