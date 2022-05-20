import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import CreateMemberDto from '../../dto/members/create-member.dto';
import UpdateMemberDto from '../../dto/members/update-member.dto';

@Injectable()
export default class MembersService {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const { shipId } = createMemberDto;
    await ResourceValidator.isFull(this.memberRepository, shipId, 'sh');
    await ResourceValidator.validateResourceId(createMemberDto, this.shipRepository, 'Crew');
    await ResourceValidator.checkIfResourceExist(createMemberDto, this.memberRepository, 'Crew Member');

    const crew: Member = this.memberRepository.create(createMemberDto);
    crew.ship = await this.shipRepository.findOne({
      where: {
        id: shipId,
      },
    });

    const crewMember = await this.memberRepository.save(crew);
    return Util.formatJSONResponse('New Crew Member added!', 201, crewMember, 'crewMember');
  }

  async findAll() {
    const crewMembers = await this.memberRepository.find({ relations: { ship: true } });
    return Util.formatJSONResponse('All available Crew Members', 200, crewMembers, 'crewMembers');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId({ id }, this.memberRepository, null);
    const crewMember = await this.memberRepository.find({
      where: { id },
      relations: { ship: true },
    });
    return Util.formatJSONResponse('Crew Member was found.', 200, crewMember, 'crewMember');
  }

  async update(name: string, updateMemberDto: UpdateMemberDto) {
    const { name: memberName, from_ship: fromShip, to_ship: toShip } = updateMemberDto;
    const crewMember = await this.memberRepository.findAndCount({
      where: {
        name,
      },
      relations: { ship: true },
    });

    if (name !== memberName || crewMember[1] < 1) {
      throw new BadRequestException(`Sorry, no ship with name of ${name}`);
    }

    await ResourceValidator.validateResourceId(
      {
        shipId: fromShip,
      },
      this.shipRepository,
      'Crew',
    );

    await ResourceValidator.validateResourceId(
      {
        shipId: toShip,
      },
      this.shipRepository,
      'Crew',
    );

    await ResourceValidator.isFull(this.memberRepository, toShip, 'sh');

    const crew: Member = this.memberRepository.create(crewMember[0][0]);
    crew.ship.id = toShip;

    const updatedCrewMember = await this.memberRepository.update({ name }, crew);
    return Util.formatJSONResponse('Crew Member was successfully switched.', 200, updatedCrewMember, 'crewMember');
  }

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ id }, this.memberRepository, null);
    const crewMember = await this.memberRepository.delete({ id });
    return Util.formatJSONResponse('Crew Member deletion was successful.', 200, crewMember, 'crewMember');
  }
}
