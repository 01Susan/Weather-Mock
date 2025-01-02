import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './Location';

@Entity()
export class WeatherForecast {
  @PrimaryGeneratedColumn()
  id!: number; 

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location: Location;  // FK to the Location entity

  @Column({ type: 'date' })
  date!: string; 

  @Column('decimal', { precision: 5, scale: 2 })
  min_temp!: number;

  @Column('decimal', { precision: 5, scale: 2 })
  max_temp!: number;

  @Column({ length: 255 })
  condition!: string;  // (sunny, cloudy)
}
