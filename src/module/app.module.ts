import { Module } from '@nestjs/common';
import MembersModule from './members/members.module';
import ShipsModule from './ships/ships.module';
import MothershipsModule from './motherships/motherships.module';

@Module({
  imports: [MembersModule, ShipsModule, MothershipsModule],
})
export default class AppModule {}
