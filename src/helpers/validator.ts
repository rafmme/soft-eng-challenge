import { ConflictException, NotFoundException } from '@nestjs/common';
import CreateMothershipDto from 'src/dto/motherships/create-mothership.dto';
import CreateShipDto from 'src/dto/ships/create-ship.dto';
import mothershipEntity from 'src/entities/motherships/mothership.entity';
import shipEntity from 'src/entities/ships/ship.entity';
import { Repository } from 'typeorm';

export default class ResourceValidator {
  static async checkIfResourceExist(
    resource: CreateMothershipDto | CreateShipDto,
    repository: Repository<shipEntity> | Repository<mothershipEntity>,
    resourceType: string,
  ) {
    const checkIfResourceExists: boolean =
      (await repository.find({ where: { name: resource.name } })).length >= 1 ? true : false;

    if (checkIfResourceExists) {
      throw new ConflictException(`${resourceType} with name of '${resource.name}' already exist!`);
    }
  }

  static async validateResourceId(
    resource: CreateShipDto,
    repository: Repository<shipEntity> | Repository<mothershipEntity>,
    resourceType: string,
  ) {
     if (resourceType === 'Ship') {
        const checkMothershipId: boolean =
      (await repository.find({ where: { id: resource.mothershipId!}})).length >= 1 ? true : false;

      if (!checkMothershipId) {
        throw new NotFoundException(`No Mothership with the ID of '${resource.mothershipId}'`);
      }

     }

     if (resourceType === 'Crew') {
        
     }
  }
}
