import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MothershipsService from '../../services/motherships/motherships.service';
import MothershipsController from '../../controllers/v1/motherships/motherships.controller';
import Mothership from '../../entities/motherships/mothership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mothership])],
  controllers: [MothershipsController],
  providers: [MothershipsService],
})
export default class MothershipsModule {}
