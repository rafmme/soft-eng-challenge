import { Module } from '@nestjs/common';
import ShipsService from '../../services/ships/ships.service';
import ShipsController from '../../controllers/ships/ships.controller';

@Module({
  controllers: [ShipsController],
  providers: [ShipsService],
})
export default class ShipsModule {}
