import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pega' })
export class Pega {
  @PrimaryColumn()
  readonly id: number;

  @Column()
  readonly created: string;

  @Column()
  readonly updated: string;

  @Column()
  readonly name: string;

  @Column()
  readonly cost: number;

  @Column()
  readonly market_value: number;

  @Column()
  readonly earned_to_date: number;

  @Column()
  readonly place_rate: number;

  @Column()
  readonly total_races: number;

  @Column()
  readonly owner_player_id: string;
}
