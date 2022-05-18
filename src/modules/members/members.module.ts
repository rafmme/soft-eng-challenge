import { Module } from '@nestjs/common';
import MembersService from '../../services/members/members.service';
import MembersController from '../../controllers/v1/members/members.controller';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
})
export default class MembersModule {}
