import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';
import Util from 'src/helpers';
import ResourceValidator from 'src/helpers/validator';
import { Repository } from 'typeorm';
import CreateMemberDto from '../../dto/members/create-member.dto';
import UpdateMemberDto from '../../dto/members/update-member.dto';

@Injectable()
export default class MembersService {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const crew: Member = this.memberRepository.create(createMemberDto);
    await ResourceValidator.validateResourceId(createMemberDto, this.shipRepository, 'Crew');
    await ResourceValidator.checkIfResourceExist(createMemberDto, this.memberRepository, 'Crew Member');
    const crewMember = await this.memberRepository.save(crew);
    return Util.formatJSONResponse('New Crew Member added!', 201, crewMember, 'crewMember');
  }

  async findAll() {
    const crewMembers = await this.memberRepository.find({ relations: { ship: true } });
    return Util.formatJSONResponse('All available Crew Members', 200, crewMembers, 'crewMembers');
  }

  async findOne(id: string) {
    await ResourceValidator.validateResourceId({ id }, this.memberRepository, null);
    const crewMember = await this.memberRepository.find({ where: { id } });
    return Util.formatJSONResponse('Crew Member was found.', 200, crewMember, 'crewMember');
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  async remove(id: string) {
    await ResourceValidator.validateResourceId({ id }, this.memberRepository, null);
    const crewMember = await this.memberRepository.delete({ id });
    return Util.formatJSONResponse('Crew Member deletion was successful.', 200, crewMember, 'crewMember');
  }
}
