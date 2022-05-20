import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ship from 'src/entities/ships/ship.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Member from 'src/entities/members/member.entity';
import MembersService from 'src/services/members/members.service';
import ShipsController from '../../controllers/v1/ships/ships.controller';
import ShipsService from '../../services/ships/ships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Mothership, Member])],
  controllers: [ShipsController],
  providers: [ShipsService, MembersService],
})
export default class ShipsModule {}
