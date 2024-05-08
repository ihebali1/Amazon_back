import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  video: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;
}
