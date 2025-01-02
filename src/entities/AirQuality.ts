import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './Location';

@Entity()
export class AirQuality {
  @PrimaryGeneratedColumn()
  id!: number; 

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column('int')
  aqi!: number; 

  @Column({ length: 255 })// ("Good", "Moderate")
    description: string;
}
