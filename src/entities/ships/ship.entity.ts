import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Member from '../members/member.entity';
import Mothership from '../motherships/mothership.entity';

@Entity()
export default class Ship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'mothership_id' })
  mothershipId: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Mothership, (mothership) => mothership.ships)
  mothership: Mothership;

  @OneToMany(() => Member, (member: Member) => member.ship)
  members: Member[];
}
