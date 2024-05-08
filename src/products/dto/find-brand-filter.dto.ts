import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsOptional } from "class-validator";

export class FindBrandsFilter {
    @ApiProperty({ required: false })
    @IsUUID()
    @IsOptional()
    department: string;
}