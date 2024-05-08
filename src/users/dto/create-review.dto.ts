import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  comment: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  rating: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  products: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clients: string;
}
