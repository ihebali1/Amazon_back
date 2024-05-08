import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateVendorDocumentDto {
    @ApiProperty({
        required: false,
    })
    @IsUUID()
    @IsOptional()
    identityBack: string;

    @ApiProperty({
        required: false,
    })
    @IsUUID()
    @IsOptional()
    identityFront: string;

    @ApiProperty({
        required: false,
    })
    @IsUUID()
    @IsOptional()
    statement: string;

}