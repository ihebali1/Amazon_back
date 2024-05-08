import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateParentCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arName: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  department: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  image: string;
}
