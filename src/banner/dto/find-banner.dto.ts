import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { BannerLinkTypeEnum } from "../enums/banner-link-type.enum";
import { BannerTypeEnum } from "../enums/banner-type.enum";

export class FindBannerDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(BannerTypeEnum)
    type: BannerTypeEnum;

    @ApiProperty()
    @IsOptional()
    @IsEnum(BannerLinkTypeEnum)
    linkType: BannerLinkTypeEnum;
}
