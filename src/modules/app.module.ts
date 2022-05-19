import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MembersModule from './members/members.module';
import ShipsModule from './ships/ships.module';
import MothershipsModule from './motherships/motherships.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [`${__dirname}/../**/*.entity.{js,ts}`],
      synchronize: true,
    }),
    MembersModule,
    ShipsModule,
    MothershipsModule,
  ],
})
export default class AppModule {}
