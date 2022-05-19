import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import { Repository } from 'typeorm';
import CreateMothershipDto from '../../dto/motherships/create-mothership.dto';
import UpdateMothershipDto from '../../dto/motherships/update-mothership.dto';

@Injectable()
export default class MothershipsService {
  constructor(@InjectRepository(Mothership) private readonly mothershipRepository: Repository<Mothership>) {}

  async create(createMothershipDto: CreateMothershipDto) {
    const mothership: Mothership = this.mothershipRepository.create(createMothershipDto);
    await ResourceValidator.checkIfResourceExist(createMothershipDto, this.mothershipRepository, 'Mothership');
    const motherShip = await this.mothershipRepository.save(mothership);
    return Util.formatJSONResponse('New Mothership created!', 201, motherShip, 'mothership');
  }

  async findAll() {
    const motherships = await this.mothershipRepository.find({ relations: ['ships'] });
    return Util.formatJSONResponse('All available Motherships', 200, motherships, 'motherships');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId({ mothershipId: id }, this.mothershipRepository, 'Ship');
    const mothership = await this.mothershipRepository.find({ where: { id } });
    return Util.formatJSONResponse('Mothership was found.', 200, mothership, 'mothership');
  }

  update(id: number, updateMothershipDto: UpdateMothershipDto) {
    return `This action updates a #${id} mothership`;
  }

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ mothershipId: id }, this.mothershipRepository, 'Ship');
    const mothership = await this.mothershipRepository.delete({ id });
    return Util.formatJSONResponse('Ship deletion was successful.', 200, mothership, 'mothership');
  }
}
