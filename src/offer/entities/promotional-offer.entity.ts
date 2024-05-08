import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Client, Vendor } from 'src/users/entities/users.entity';
import { DealsTypeEnum } from '../enums/deals-type.enum';
import { CouponsTypeEnum } from '../enums/coupons-type.enum';
import { PromotionsTypeEnum } from '../enums/promotions-type.enum';
import { DealProduct } from './deal-product.entity';
import { TierPromotions } from './tier-promotions.entity';
import { IsOptional, IsString } from 'class-validator';
import { BuyableProduct } from 'src/products/entities/product.entity';
@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export abstract class PromotinalOffer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @IsString()
  @IsOptional()
  protected isActive: boolean;

  @Column({
    nullable: true,
  })
  discount: number;

  @Column({
    nullable: true,
  })
  redemptionLimit: boolean;

  @ManyToOne(() => Vendor, (vendor) => vendor.offers)
  vendor: Vendor | string;

  @ManyToOne(() => Client, (client) => client.offers)
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  generateMainPath(): void {
    this.isActive = this.endDate > new Date()
  }
  
}
@ChildEntity('PROMOTIONS')
export class Promotions extends PromotinalOffer {
  @Column({
    type: 'enum',
    enum: PromotionsTypeEnum,
  })
  type: PromotionsTypeEnum;

  @Column()
  description: string;

  @Column()
  minQuantity: number;

  @OneToMany(
    () => TierPromotions,
    (tiersPromotions) => tiersPromotions.promotion,
  )
  tier: TierPromotions[] | string[];

  @ManyToMany(() => BuyableProduct, (product) => product.promotions)
  products: BuyableProduct[];

  @ManyToMany(() => BuyableProduct)
  @JoinTable()
  appliesTo: BuyableProduct[];
}

@ChildEntity('DEALS')
export class Deals extends PromotinalOffer {
  @Column({
    type: 'enum',
    enum: DealsTypeEnum,
  })
  dealType: DealsTypeEnum;

  @OneToMany(() => DealProduct, (dealProduct) => dealProduct.deal)
  dealProducts: DealProduct[] | string[];
}

@ChildEntity('COUPONS')
export class Coupons extends PromotinalOffer {
  @Column()
  title: string;

  @Column()
  budget: number;
  @Column({
    type: 'enum',
    enum: CouponsTypeEnum,
  })
  type: CouponsTypeEnum;

  @ManyToMany(() => BuyableProduct, (product) => product.coupons)
  products: BuyableProduct[];
}


