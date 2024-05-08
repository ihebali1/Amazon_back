import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserSubscriptionDto {

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    subscription: string;

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    cardToken: string;
}
