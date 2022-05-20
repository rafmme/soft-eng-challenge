import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import MembersService from '../../../services/members/members.service';
import CreateMemberDto from '../../../dto/members/create-member.dto';
import UpdateMemberDto from '../../../dto/members/update-member.dto';

@Controller('v1/members')
@ApiTags('crew members')
export default class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'A new crew member was added to a ship',
  })
  @ApiResponse({
    status: 400,
    description: 'A bad input was submitted',

  })
  @ApiResponse({
    status: 404,
    description: 'The ship for the crew member does not exist',
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Fetches all crew members',
  })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a crew mmember that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A crew member was successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':name')
  @ApiParam({
    name: 'name',
    required: true,
    description: 'Should be the name of a crew mmember that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A crew member data was successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'A bad input was submitted',

  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  update(@Param('name') name: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(name, updateMemberDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a crew member that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A crew member was successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
