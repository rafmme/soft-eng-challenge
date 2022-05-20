import {
  Controller, Get, Post, Body, Param, Delete,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import MothershipsService from '../../../services/motherships/motherships.service';
import CreateMothershipDto from '../../../dto/motherships/create-mothership.dto';

@Controller('v1/motherships')
@ApiTags('motherships')
export default class MothershipsController {
  constructor(private readonly mothershipsService: MothershipsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'A new mothership was created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'A bad input was submitted',
  })
  create(@Body() createMothershipDto: CreateMothershipDto) {
    return this.mothershipsService.create(createMothershipDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Fetches all motherships',
  })
  findAll() {
    return this.mothershipsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a mothership that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A mothership was successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.mothershipsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a mothership that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A mothership was successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  remove(@Param('id') id: string) {
    return this.mothershipsService.remove(id);
  }
}
