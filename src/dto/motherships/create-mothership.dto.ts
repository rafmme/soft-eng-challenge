import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateMothershipDto {
  @ApiProperty({ example: 'MS Carl Vincent' })
  @IsString()
  @IsNotEmpty()
    name: string;
}
