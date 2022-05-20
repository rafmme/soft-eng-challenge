import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsNotEmpty, IsInt, Min,
} from 'class-validator';

export default class CreateShipDto {
  @ApiProperty({
    example: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
    description: 'Has to be UUID for a Ship',
  })
  @IsString()
  @IsNotEmpty()
    mothershipId: string;

  @ApiProperty({
    example: 2,
    description: 'Number of ships you want to create',
  })
  @IsInt()
  @Min(1)
    quantity?: number;
}
