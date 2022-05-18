import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import ResourceValidator from 'src/helpers/validator';
import { Repository } from 'typeorm';
import CreateShipDto from '../../dto/ships/create-ship.dto';
import UpdateShipDto from '../../dto/ships/update-ship.dto';

@Injectable()
export default class ShipsService {
  constructor(
    @InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
    @InjectRepository(Mothership) private readonly mothershipRepository: Repository<Mothership>,
  ) {}

  async create(createShipDto: CreateShipDto) {
    const ship: Ship = this.shipRepository.create(createShipDto);
    await ResourceValidator.validateResourceId(createShipDto, this.mothershipRepository, 'Ship');
    await ResourceValidator.checkIfResourceExist(createShipDto, this.shipRepository, 'Ship');
    return this.shipRepository.save(ship);
  }

  findAll() {
    return `This action returns all ships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ship`;
  }

  update(id: number, updateShipDto: UpdateShipDto) {
    return `This action updates a #${id} ship`;
  }

  remove(id: number) {
    return `This action removes a #${id} ship`;
  }
}
