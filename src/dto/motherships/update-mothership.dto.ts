import { PartialType } from '@nestjs/swagger';
import CreateMothershipDto from './create-mothership.dto';

export default class UpdateMothershipDto extends PartialType(CreateMothershipDto) {}
