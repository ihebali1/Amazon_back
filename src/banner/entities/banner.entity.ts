import { Department } from "src/products/entities/department.entity";
import { Vendor } from "src/users/entities/users.entity";
import { ChildEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";
import { BannerTypeEnum } from "../enums/banner-type.enum";
import { File } from 'src/file/entities/file.entity';
import { BannerLinkTypeEnum } from "../enums/banner-link-type.enum";
import { SimpleProduct, ParentListing } from "src/products/entities/product.entity";

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export class Banner {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'enum',
        enum: BannerTypeEnum,
    })
    type: BannerTypeEnum;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    @OneToOne(() => File)
    @JoinColumn()
    image: File | string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity('PRODUCT_BANNER')
export class ProductBanner extends Banner {

    @Column({
        type: 'enum',
        enum: BannerLinkTypeEnum,
        default :BannerLinkTypeEnum.PRODUCT,
    })
    linkType: BannerLinkTypeEnum;

    @ManyToOne(() => SimpleProduct, (simpleProduct) => simpleProduct.banners)
    simpleProduct: SimpleProduct | string;

    @ManyToOne(() => ParentListing, (parentListing) => parentListing.banners)
    parentListing: ParentListing | string;
}

@ChildEntity('DEPARTMENT_BANNER')
export class DepartmentBanner extends Banner {
    @Column({
        type: 'enum',
        enum: BannerLinkTypeEnum,
        default :BannerLinkTypeEnum.DEPARTMENT,
    })
    linkType: BannerLinkTypeEnum = BannerLinkTypeEnum.DEPARTMENT;

    @ManyToOne(() => Department, (department) => department.banners)
    department: Department | string;
}

@ChildEntity('VENDOR_BANNER')
export class VendorBanner extends Banner {
    @Column({
        type: 'enum',
        enum: BannerLinkTypeEnum,
        default :BannerLinkTypeEnum.VENDOR,
    })
    linkType: BannerLinkTypeEnum = BannerLinkTypeEnum.VENDOR;

    @ManyToOne(() => Vendor, (vendor) => vendor.banners)
    vendor: Vendor | string;
}