import { ApiProperty } from '@nestjs/swagger';
import {
    MaxLength,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateBankInfoDto {
    @ApiProperty({
        required: true,
    })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    ibanNumber: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    accountNumber: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    bankName: string;


}
