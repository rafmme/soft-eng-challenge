import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
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
    const newShip = await this.shipRepository.save(ship);
    return Util.formatJSONResponse('New Ship created!', 201, newShip, 'ship');
  }

  async findAll() {
    const ships = await this.shipRepository.find({ relations: { mothership: true, members: true } });
    return Util.formatJSONResponse('All available Ships', 200, ships, 'ships');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId({ shipId: id }, this.shipRepository, 'Crew');
    const ship = await this.shipRepository.find({ where: { id } });
    return Util.formatJSONResponse('Ship was found.', 200, ship, 'ship');
  }

  update(id: number, updateShipDto: UpdateShipDto) {
    return `This action updates a #${id} ship`;
  }

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ shipId: id }, this.shipRepository, 'Crew');
    const ship = await this.shipRepository.delete({ id });
    return Util.formatJSONResponse('Ship deletion was successful.', 200, ship, 'ship');
  }
}
