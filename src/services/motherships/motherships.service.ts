import { Injectable } from '@nestjs/common';
import CreateMothershipDto from '../../dto/motherships/create-mothership.dto';
import UpdateMothershipDto from '../../dto/motherships/update-mothership.dto';

@Injectable()
export default class MothershipsService {
  create(createMothershipDto: CreateMothershipDto) {
    return 'This action adds a new mothership';
  }

  findAll() {
    return `This action returns all motherships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mothership`;
  }

  update(id: number, updateMothershipDto: UpdateMothershipDto) {
    return `This action updates a #${id} mothership`;
  }

  remove(id: number) {
    return `This action removes a #${id} mothership`;
  }
}
