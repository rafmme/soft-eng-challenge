import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Ship from '../ships/ship.entity';

export default class Mothership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Ship, (ship) => ship.mothership)
  ships: Ship[];
}
