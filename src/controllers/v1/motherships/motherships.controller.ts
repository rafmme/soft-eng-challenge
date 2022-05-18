import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import MothershipsService from '../../../services/motherships/motherships.service';
import CreateMothershipDto from '../../../dto/motherships/create-mothership.dto';
import UpdateMothershipDto from '../../../dto/motherships/update-mothership.dto';

@Controller('v1/motherships')
export default class MothershipsController {
  constructor(private readonly mothershipsService: MothershipsService) {}

  @Post()
  create(@Body() createMothershipDto: CreateMothershipDto) {
    return this.mothershipsService.create(createMothershipDto);
  }

  @Get()
  findAll() {
    return this.mothershipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mothershipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMothershipDto: UpdateMothershipDto) {
    return this.mothershipsService.update(+id, updateMothershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mothershipsService.remove(+id);
  }
}
