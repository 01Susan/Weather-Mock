// src/entities/WeatherRealtime.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './Location';

@Entity()
export class WeatherRealtime {
  @PrimaryGeneratedColumn()
  id!: number; 

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location: Location;  

  @Column('decimal', { precision: 5, scale: 2 })
  temperature!: number;  

  @Column({ length: 255 })
  condition!: string; 

  @Column('int')
  humidity!: number; 

  @Column('decimal', { precision: 5, scale: 2 })
  wind_speed!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date; 
}
