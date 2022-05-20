import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export default class CreateShipDto {
  @ApiProperty({ example: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef' })
  @IsString()
  @IsNotEmpty()
    mothershipId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
    quantity?: number;
}
