import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateShipDto {
  @ApiProperty({ example: 'SH MAERSK' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef' })
  @IsString()
  @IsNotEmpty()
  mothershipId: string;
}
