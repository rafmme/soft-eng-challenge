import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Ship from '../ships/ship.entity';

@Entity()
export default class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Ship, (ship) => ship.members)
  ship: Ship;
}
