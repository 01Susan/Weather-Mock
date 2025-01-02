import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number; 
  @Column({ length: 255 })
  name!: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude: number | null = null;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude: number | null = null;
}
