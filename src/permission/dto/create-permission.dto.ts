import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly name: string;
}
