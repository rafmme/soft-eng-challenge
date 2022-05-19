import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ship from 'src/entities/ships/ship.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import ShipsController from '../../controllers/v1/ships/ships.controller';
import ShipsService from '../../services/ships/ships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Mothership])],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export default class ShipsModule {}
