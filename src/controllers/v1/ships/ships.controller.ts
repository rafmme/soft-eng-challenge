import {
  Controller, Get, Post, Body, Param, Delete,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import ShipsService from '../../../services/ships/ships.service';
import CreateShipDto from '../../../dto/ships/create-ship.dto';

@Controller('v1/ships')
@ApiTags('ships')
export default class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'A new ship was created successfully',

  })
  @ApiResponse({
    status: 400,
    description: 'A bad input was submitted',

  })
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Fetches all ships',
  })
  findAll() {
    return this.shipsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a ship that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A ship was successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.shipsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id (UUID) of a ship that exist',
  })
  @ApiResponse({
    status: 200,
    description: 'A ship was successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  remove(@Param('id') id: string) {
    return this.shipsService.remove(id);
  }
}
