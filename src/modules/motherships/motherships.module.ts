import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ship from 'src/entities/ships/ship.entity';
import Member from 'src/entities/members/member.entity';
import ShipsService from 'src/services/ships/ships.service';
import MembersService from 'src/services/members/members.service';
import MothershipsService from '../../services/motherships/motherships.service';
import MothershipsController from '../../controllers/v1/motherships/motherships.controller';
import Mothership from '../../entities/motherships/mothership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mothership, Ship, Member])],
  controllers: [MothershipsController],
  providers: [MothershipsService, ShipsService, MembersService],
})
export default class MothershipsModule {}
