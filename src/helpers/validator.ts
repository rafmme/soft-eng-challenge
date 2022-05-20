import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import CreateMothershipDto from 'src/dto/motherships/create-mothership.dto';
import Member from 'src/entities/members/member.entity';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from '.';

export default class ResourceValidator {
  /**
   * @description A function that checks if an entity with same name already exists
   * @param {CreateMothershipDto | CreateMemberDto} resource DTO for an entity
   * @param {Repository<Ship> | Repository<Mothership> | Repository<Member>} repository
   * @param {string} resourceType - entity name
   */
  static async checkIfResourceExist(
    resource: CreateMothershipDto | CreateMemberDto,
    repository: Repository<Ship> | Repository<Mothership> | Repository<Member>,
    resourceType: string,
  ) {
    const { name } = resource;
    const checkIfResourceExists: boolean = (
      await repository.find({
        where: {
          name,
        },
      })
    ).length >= 1;

    if (checkIfResourceExists) {
      throw new ConflictException(`${resourceType} with name of '${name}' already exist!`);
    }
  }

  /**
   * @description A function that checks if an entity with a given id exist
   * @param {CreateMothershipDto | CreateMemberDto} resource DTO for an entity
   * @param {Repository<Ship> | Repository<Mothership> | Repository<Member>} repository
   * @param {string | null} resourceType - entity name
   */
  static async validateResourceId(
    resource,
    repository: Repository<Ship> | Repository<Mothership> | Repository<Member>,
    resourceType: string | null,
  ) {
    const { mothershipId, shipId, id } = resource;
    if (resourceType === 'Ship') {
      const checkMothershipId: boolean = (
        await repository.find({
          where: {
            id: mothershipId,
          },
        })
      ).length >= 1;

      if (!checkMothershipId) {
        throw new NotFoundException(`No Mothership with the ID of '${mothershipId}'`);
      }
    }

    if (resourceType === 'Crew') {
      const checkShipId: boolean = (
        await repository.find({
          where: {
            id: shipId,
          },
        })
      ).length >= 1;

      if (!checkShipId) {
        throw new NotFoundException(`No Ship with the ID of '${shipId}'`);
      }
    }

    if (!resourceType) {
      const checkCrewMemberId: boolean = (
        await repository.find({
          where: { id },
        })
      ).length >= 1;

      if (!checkCrewMemberId) {
        throw new NotFoundException(`No Crew Member with the ID of '${id}'`);
      }
    }
  }

  /**
   * @description A function that checks if a ships/mothership has reached its max limit
   * @param {Repository<Ship> | Repository<Mothership>} repository
   * @param {string} id - entity id
   * @param {string} type - entity type
   * @param {number?} count - number of entity to be added
   */
  static async isFull(repository, id: string, type: string, count?: number) {
    if (type === 'ms') {
      const shipCount = Util.shipCount(
        await repository.find({
          relations: { mothership: true },
        }),
        id,
      );

      if (count && count > 9 - shipCount) {
        throw new UnprocessableEntityException(
          `Sorry! You can only add ${9 - shipCount} more ships to Mothership '${id}'.`,
        );
      }

      if (count <= 0) {
        throw new BadRequestException(`Quantity of ships to be added can't be ${count}`);
      }

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
