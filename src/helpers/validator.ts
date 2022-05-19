import { ConflictException, NotFoundException } from '@nestjs/common';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import CreateMothershipDto from 'src/dto/motherships/create-mothership.dto';
import CreateShipDto from 'src/dto/ships/create-ship.dto';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import { Repository } from 'typeorm';

export default class ResourceValidator {
  static async checkIfResourceExist(
    resource: CreateMothershipDto | CreateShipDto | CreateMemberDto,
    repository: Repository<Ship> | Repository<Mothership> | Repository<Member>,
    resourceType: string,
  ) {
    const checkIfResourceExists: boolean =
      (await repository.find({ where: { name: resource.name } })).length >= 1 ? true : false;

    if (checkIfResourceExists) {
      throw new ConflictException(`${resourceType} with name of '${resource.name}' already exist!`);
    }
  }

  static async validateResourceId(
    resource,
    repository: Repository<Ship> | Repository<Mothership> | Repository<Member>,
    resourceType: string | null,
  ) {
    if (resourceType === 'Ship') {
      const checkMothershipId: boolean =
        (await repository.find({ where: { id: resource.mothershipId! } })).length >= 1 ? true : false;

      if (!checkMothershipId) {
        throw new NotFoundException(`No Mothership with the ID of '${resource.mothershipId}'`);
      }
    }

    if (resourceType === 'Crew') {
      const checkShipId: boolean =
        (await repository.find({ where: { id: resource.shipId } })).length >= 1 ? true : false;

      if (!checkShipId) {
        throw new NotFoundException(`No Ship with the ID of '${resource.shipId}'`);
      }
    }

    if (!resourceType) {
      const checkCrewMemberId: boolean =
        (await repository.find({ where: { id: resource.id } })).length >= 1 ? true : false;

      if (!checkCrewMemberId) {
        throw new NotFoundException(`No Crew Member with the ID of '${resource.id}'`);
      }
    }
  }
}
