import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: Pega.TABLE_NAME })
export class Pega {
  static TABLE_NAME = 'pegas';

  @PrimaryColumn()
  readonly id: number;

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

  @Column()
  readonly avatar_id_1: string;

  @Column()
  readonly avatar_id_2: string;
}
