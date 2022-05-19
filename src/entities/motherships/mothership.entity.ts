import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Ship from '../ships/ship.entity';

@Entity()
export default class Mothership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Ship, (ship) => ship.mothership)
  ships: Ship[];
}
