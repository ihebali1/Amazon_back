import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class FindChatMessagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
