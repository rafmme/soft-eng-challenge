import { Module } from '@nestjs/common';
import MembersService from '../../services/members/members.service';
import MembersController from '../../controllers/v1/members/members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Ship])],
  controllers: [MembersController],
  providers: [MembersService],
})
export default class MembersModule {}
