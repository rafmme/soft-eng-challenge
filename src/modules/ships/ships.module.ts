import { Module } from '@nestjs/common';
import ShipsService from '../../services/ships/ships.service';
import ShipsController from '../../controllers/v1/ships/ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ship from 'src/entities/ships/ship.entity';
import Mothership from 'src/entities/motherships/mothership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Mothership])],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export default class ShipsModule {}
