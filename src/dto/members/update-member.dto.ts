import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class UpdateMemberDto {
  @ApiProperty({ example: 'Jack Sparrow' })
  @IsString()
  @IsNotEmpty()
    name: string;

  @ApiProperty({
    example: '07fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
    description: 'Has to be UUID of a Ship',
  })
  @IsString()
  @IsNotEmpty()
    from_ship: string;

  @ApiProperty({
    example: '09fa9040-dd01-4b38-9c7e-bd7ec10e96ef',
    description: 'Has to be UUID of a Ship',
  })
  @IsString()
  @IsNotEmpty()
    to_ship: string;
}
