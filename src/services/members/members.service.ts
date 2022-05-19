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

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
