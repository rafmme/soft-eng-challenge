import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Ship from '../ships/ship.entity';

@Entity()
export default class Mothership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ship, (ship) => ship.mothership)
  ships: Ship[];
}
