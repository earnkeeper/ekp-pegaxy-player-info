import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'players' })
export class Player {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: 'timestamptz' })
  readonly created: Date;

  @Column({ type: 'timestamptz' })
  readonly updated: Date;

  @Column()
  readonly address: string;

  @Column()
  readonly earned_to_date: string;

  @Column()
  readonly earned_to_date_coin_id: string;
}
