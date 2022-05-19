import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import CreateMothershipDto from 'src/dto/motherships/create-mothership.dto';
import CreateShipDto from 'src/dto/ships/create-ship.dto';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from '.';

export default class ResourceValidator {
  static async checkIfResourceExist(
    resource: CreateMothershipDto | CreateShipDto | CreateMemberDto,
    repository: Repository<Ship> | Repository<Mothership> | Repository<Member>,
    resourceType: string,
  ) {
    const checkIfResourceExists: boolean = (
      await repository.find({
        where: {
          name: resource.name,
        },
      })
    ).length >= 1;

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
      const checkMothershipId: boolean = (
        await repository.find({
          where: {
            id: resource.mothershipId!,
          },
        })
      ).length >= 1;

      if (!checkMothershipId) {
        throw new NotFoundException(`No Mothership with the ID of '${resource.mothershipId}'`);
      }
    }

    if (resourceType === 'Crew') {
      const checkShipId: boolean = (
        await repository.find({
          where: {
            id: resource.shipId,
          },
        })
      ).length >= 1;

      if (!checkShipId) {
        throw new NotFoundException(`No Ship with the ID of '${resource.shipId}'`);
      }
    }

    if (!resourceType) {
      const checkCrewMemberId: boolean = (
        await repository.find({
          where: { id: resource.id },
        })
      ).length >= 1;

      if (!checkCrewMemberId) {
        throw new NotFoundException(`No Crew Member with the ID of '${resource.id}'`);
      }
    }
  }

  static async isFull(repository, id: string, type: string) {
    if (type === 'ms') {
      const shipCount = Util.shipCount(
        await repository.find({
          relations: { mothership: true },
        }),
        id,
      );

      if (shipCount >= 9) {
        throw new UnprocessableEntityException(
          `Sorry! Mothership '${id}' has reached the maximum number of ships allowed`,
        );
      }
    }

    if (type === 'sh') {
      const crewCount = Util.crewCount(
        await repository.find({
          relations: { ship: true },
        }),
        id,
      );

      if (crewCount >= 5) {
        throw new UnprocessableEntityException(
          `Sorry! Ship '${id}' has reached the maximum number of crew members allowed`,
        );
      }
    }
  }
}
