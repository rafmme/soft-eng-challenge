import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import CreateShipDto from '../../dto/ships/create-ship.dto';
import UpdateShipDto from '../../dto/ships/update-ship.dto';
import MembersService from '../members/members.service';

@Injectable()
export default class ShipsService {
  constructor(
    @InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
    @InjectRepository(Mothership) private readonly mothershipRepository: Repository<Mothership>,
    private membersService: MembersService,
  ) {}

  async create(createShipDto: CreateShipDto) {
    const ships = [];

    await ResourceValidator.isFull(this.shipRepository, createShipDto.mothershipId, 'ms', createShipDto.quantity);
    await ResourceValidator.validateResourceId(createShipDto, this.mothershipRepository, 'Ship');

    const mothership = await this.mothershipRepository.findOne({
      where: {
        id: createShipDto.mothershipId,
      },
    });

    for (const element of Util.createArray(createShipDto.quantity)) {
      const shipData = {
        mothershipId: createShipDto.mothershipId,
        quantity: createShipDto.quantity,
        name: Util.generateResourceName(
          'ship',
          mothership.name,
          createShipDto.mothershipId,
        ),
      };

      const membersList = [];
      const ship: Ship = this.shipRepository.create(shipData);
      ship.mothership = mothership;

      const newShip = JSON.parse(
        JSON.stringify(await this.shipRepository.save(ship)),
      );

      for (const element of Util.createArray(3)) {
        const memberDto: CreateMemberDto = {
          name: Util.generateResourceName('crew', newShip.name, newShip.id),
          shipId: newShip.id,
        };

        const member = await this.membersService.create(memberDto);

        membersList.push({
          id: member.crewMember.id,
          name: member.crewMember.name,
          ship: undefined,
          createdAt: member.crewMember.createdAt,
          updatedAt: member.crewMember.updatedAt,
        });

        newShip.members = membersList;
      }
      ships.push(newShip);
    }

    return Util.formatJSONResponse('New Ship created!', 201, ships, 'ships');
  }

  async findAll() {
    const ships = await this.shipRepository.find({
      relations: { mothership: true, members: true },
    });
    return Util.formatJSONResponse('All available Ships', 200, ships, 'ships');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId({ shipId: id }, this.shipRepository, 'Crew');
    const ship = await this.shipRepository.find({
      where: { id },
      relations: {
        mothership: true,
        members: true,
      },
    });
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
