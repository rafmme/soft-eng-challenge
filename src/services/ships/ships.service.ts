import { Injectable } from '@nestjs/common';
import CreateShipDto from '../../dto/ships/create-ship.dto';
import UpdateShipDto from '../../dto/ships/update-ship.dto';

@Injectable()
export default class ShipsService {
  create(createShipDto: CreateShipDto) {
    return 'This action adds a new ship';
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
