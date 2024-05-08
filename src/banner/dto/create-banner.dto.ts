import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ProductTypeEnum } from "src/products/enums/product-type.enum";
import { BannerLinkTypeEnum } from "../enums/banner-link-type.enum";
import { BannerTypeEnum } from "../enums/banner-type.enum";

export class CreateBannerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(BannerTypeEnum)
    type: BannerTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(BannerLinkTypeEnum)
    linkType: BannerLinkTypeEnum;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    product: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    department: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    vendor: string;

    @ApiProperty({ required: false })
    @IsEnum(ProductTypeEnum)
    @IsOptional()
    productType: ProductTypeEnum;
}
