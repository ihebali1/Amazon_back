import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateVatDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(99)
  @Min(0)
  percentage: number;
}
