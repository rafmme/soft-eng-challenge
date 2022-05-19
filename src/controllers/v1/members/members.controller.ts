import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MembersService from '../../../services/members/members.service';
import CreateMemberDto from '../../../dto/members/create-member.dto';
import UpdateMemberDto from '../../../dto/members/update-member.dto';

@Controller('v1/members')
@ApiTags('crew members')
export default class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(name, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
