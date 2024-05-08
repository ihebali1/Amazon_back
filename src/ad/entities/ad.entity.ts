import { Product } from "src/products/entities/product.entity";
import { Vendor } from "src/users/entities/users.entity";
import { TableInheritance, Entity, PrimaryGeneratedColumn, Column, ChildEntity, ManyToOne } from "typeorm";
import { AdLinkTypeEnum } from "../dto/enums/ad-link-type.enum";

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export class Ad {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
}

@ChildEntity('AD_PRODUCT')
export class AdProduct extends Ad {

    @Column({
        type: 'enum',
        enum: AdLinkTypeEnum,
        default :AdLinkTypeEnum.PRODUCT,
    })
    linkType: AdLinkTypeEnum;

    @ManyToOne(() => Product, (product) => product.ads)
    product: Product | string;

}

@ChildEntity('AD_VENDOR')
export class AdVendor extends Ad {

    @Column({
        type: 'enum',
        enum: AdLinkTypeEnum,
        default :AdLinkTypeEnum.VENDOR,
    })
    linkType: AdLinkTypeEnum;

    @ManyToOne(() => Vendor, (vendor) => vendor.ads)
    vendor: Vendor | string;

}
