import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import { Repository } from 'typeorm';
import CreateMothershipDto from '../../dto/motherships/create-mothership.dto';
import UpdateMothershipDto from '../../dto/motherships/update-mothership.dto';

@Injectable()
export default class MothershipsService {
  constructor(@InjectRepository(Mothership) private readonly mothershipRepository: Repository<Mothership>) {}

  async create(createMothershipDto: CreateMothershipDto) {
    const mothership: Mothership = this.mothershipRepository.create(createMothershipDto);
    const checkIfMothershipAlreadyExists: boolean =
      (await this.mothershipRepository.find({ where: { name: mothership.name } })).length >= 1 ? true : false;

    if (checkIfMothershipAlreadyExists) {
      throw new ConflictException(`Mothership with name of '${mothership.name}' already exist!`);
    }

    return this.mothershipRepository.save(mothership);
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
