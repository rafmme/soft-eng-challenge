import { Module } from '@nestjs/common';
import MothershipsService from '../../services/motherships/motherships.service';
import MothershipsController from '../../controllers/v1/motherships/motherships.controller';

@Module({
  controllers: [MothershipsController],
  providers: [MothershipsService],
})
export default class MothershipsModule {}
