import { PartialType } from '@nestjs/swagger';
import CreateShipDto from './create-ship.dto';

export default class UpdateShipDto extends PartialType(CreateShipDto) {}
