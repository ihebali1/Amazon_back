import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdatePersonnalInfoDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  dateBirth: Date;
}
