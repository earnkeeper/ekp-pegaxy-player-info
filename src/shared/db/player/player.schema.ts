import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'player' })
export class Player {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly updated: string;
  
  @Column()
  readonly created: string;

  @Column()
  readonly address: string;

  @Column()
  readonly earned_to_date: number;

}
