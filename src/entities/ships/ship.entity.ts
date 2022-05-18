import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Member from '../members/member.entity';
import Mothership from '../motherships/mothership.entity';

@Entity()
export default class Ship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Mothership, (mothership) => mothership.ships)
  mothership: Mothership;

  @OneToMany(() => Member, (member) => member.ship)
  members: Member[];
}
