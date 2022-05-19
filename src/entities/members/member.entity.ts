import { ApiProperty } from '@nestjs/swagger';
import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import Ship from '../ships/ship.entity';

@Entity()
export default class Member {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ApiProperty()
  @Column({ unique: true })
    name: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

  @ManyToOne(() => Ship, (ship: Ship) => ship.members, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ship: Ship;
}
