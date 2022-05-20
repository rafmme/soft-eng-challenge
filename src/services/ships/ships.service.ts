import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Mothership from 'src/entities/motherships/mothership.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import CreateMemberDto from 'src/dto/members/create-member.dto';
import CreateShipDto from '../../dto/ships/create-ship.dto';
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
    const { mothershipId, quantity } = createShipDto;

    await ResourceValidator.isFull(this.shipRepository, mothershipId, 'ms', quantity);
    await ResourceValidator.validateResourceId(createShipDto, this.mothershipRepository, 'Ship');

    const mothership = await this.mothershipRepository.findOne({
      where: {
        id: mothershipId,
      },
    });
    const { name } = mothership;

    for (const {} of Util.createArray(quantity)) {
      const shipData = {
        mothershipId,
        quantity,
        name: Util.generateResourceName('ship', name, mothershipId),
      };

      const membersList = [];
      const ship: Ship = this.shipRepository.create(shipData);
      ship.mothership = mothership;

      const newShip = JSON.parse(JSON.stringify(await this.shipRepository.save(ship)));
      const { id, name: shipName } = newShip;

      for (const {} of Util.createArray(3)) {
        const memberDto: CreateMemberDto = {
          name: Util.generateResourceName('crew', shipName, id),
          shipId: id,
        };

        const member = await this.membersService.create(memberDto);
        const {
          crewMember: {
            createdAt, updatedAt, id: memberId, name: memberName,
          },
        } = member;

        membersList.push({
          createdAt,
          updatedAt,
          id: memberId,
          name: memberName,
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

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ shipId: id }, this.shipRepository, 'Crew');
    const ship = await this.shipRepository.delete({ id });
    return Util.formatJSONResponse('Ship deletion was successful.', 200, ship, 'ship');
  }
}
