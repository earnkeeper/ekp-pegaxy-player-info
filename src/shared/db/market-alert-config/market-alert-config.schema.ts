import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: MarketAlertConfig.TABLE_NAME })
export class MarketAlertConfig {
  static TABLE_NAME = 'market_alert_configs';

  @PrimaryColumn() readonly id: number;
  @Column({ type: 'timestamptz' }) readonly created: Date;
  @Column({ type: 'timestamptz' }) readonly updated: Date;

  @Column() readonly bloodline?: string;
  @Column() readonly breed_type?: number;
  @Column() readonly breed_min?: number;
  @Column() readonly breed_max?: number;
  @Column() readonly gender?: string;
  @Column() readonly price_min?: number;
  @Column() readonly price_max?: number;
  @Column() readonly alert_address: number;
  @Column() readonly alert_discord_id: number;
}
