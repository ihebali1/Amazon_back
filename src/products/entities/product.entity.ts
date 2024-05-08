import { AdProduct } from 'src/ad/entities/ad.entity';
import { ProductBanner } from 'src/banner/entities/banner.entity';
import { ProductViewHistory } from 'src/history/entities/history.entity';
import { IdeaList } from 'src/lists/entities/IdeaList.entity';
import { ProductRegistryDetails } from 'src/lists/entities/ProductRegistryDetails.entity';
import { ProductWishDetails } from 'src/lists/entities/ProductWishDetails.entity';
import { SavedItems } from 'src/lists/entities/SavedItems.entity';
import { IIdeaList } from 'src/lists/interfaces/IdeaList.interface';
import { IProductRegistryDetails } from 'src/lists/interfaces/ProductRegistryDetails.interface';
import { IProductWishDetails } from 'src/lists/interfaces/ProductWishDetails.interface';
import { ISavedItems } from 'src/lists/interfaces/SavedItems.interface';
import { ProductNotification } from 'src/notification/entities/notification.entity';
import { DealProduct } from 'src/offer/entities/deal-product.entity';
import { Coupons, Promotions } from 'src/offer/entities/promotional-offer.entity';
import { CartItem } from 'src/order-product/entities/cartItem.entity';
import { OrderItem } from 'src/order-product/entities/orderItem.entity';
import { ProductReview } from 'src/reviews/entities/product-review.entity';
import { Question } from 'src/users/entities/question.entity';
import { Client, Vendor } from 'src/users/entities/users.entity';
import { IQuestion } from 'src/users/interfaces/question.interface';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
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
import { ProductConditionEnum } from '../enums/product-condition.enum';
import { ProductIdTypeEnum } from '../enums/product-id-type.enum';
import { ProductStatusEnum } from '../enums/product-status.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { IParentListing } from '../interfaces/parent-listing-interface';
import { AttributeChoice } from './attribute-choice.entity';
import { AttributeValue } from './attribute-value.entity';
import { Brand } from './brand.entity';
import { ChildCategory } from './child-category.entity';
import { ProductFeature } from './product-feature.entity';
import { ProductKeyWord } from './product-key-word.entity';
import { ProductWarning } from './product-warning.entity';
import { Specification } from './specification.entity';
import { File } from 'src/file/entities/file.entity';
import { IVariationTheme } from '../interfaces/variation-theme.interface';
import { VariationTheme } from './variation-theme.entity';
@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    default: ProductStatusEnum.PENDING,
  })
  status: ProductStatusEnum;

  @ManyToOne(
    () => ChildCategory,
    (ChildCategory) => ChildCategory.products,
  )
  childCategory: ChildCategory | string;

  @OneToMany(
    () => AdProduct,
    (adProduct) => adProduct.product,
  )
  ads: AdProduct[] | string[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  customBrand: Brand | string;

  @OneToMany(() => ProductReview, (review) => review.product)
  reviews: ProductReview[] | string[];

  @OneToMany(() => ProductNotification, (productNotification) => productNotification.product)
  notifications: ProductNotification[]
}

@ChildEntity('BUYABLE_PRODUCT')
export class BuyableProduct extends Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  quantity: number;

  @Column({
    nullable: true,
  })
  price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[] | string[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[] | string[];

  @OneToMany(() => Question, (question) => question.client)
  questions: IQuestion[] | string[];

  @OneToMany(
    () => ProductRegistryDetails,
    (productRegistryDetails) => productRegistryDetails.product,
  )
  ProductRegistryDetailss: IProductRegistryDetails[] | string[];

  @ManyToMany(() => SavedItems, (SavedItems) => SavedItems.products)
  savedItemss: ISavedItems[];

  @OneToMany(
    () => ProductWishDetails,
    (productWishDetails) => productWishDetails.product,
  )
  productWishDetails: IProductWishDetails[] | string[];

  @ManyToOne(() => Client, (Client) => Client.products)
  clients: IUsers | string;

  @ManyToMany(() => IdeaList, (IdeaList) => IdeaList.products)
  ideaLists: IIdeaList[];

  @ManyToMany(() => Coupons, (coupon) => coupon.products)
  @JoinTable()
  coupons: Coupons[];

  @ManyToMany(() => Promotions, (promotion) => promotion.products)
  @JoinTable()
  promotions: Promotions[];

  @ManyToOne(() => Vendor, (vendor) => vendor.simpleProducts)
  vendor: Vendor | string;

  @OneToMany(() => DealProduct, (dealProduct) => dealProduct.product)
  dealProducts: DealProduct[] | string[];

  @Column({
    type: 'enum',
    enum: ProductConditionEnum,
    nullable: true,
    default: ProductConditionEnum.NEW,
  })
  condition: ProductConditionEnum;

  @Column({
    nullable: true,
  })
  productId: string;

  @Column({
    type: 'enum',
    enum: ProductIdTypeEnum,
  })
  productIdType: ProductIdTypeEnum;
}

@ChildEntity('SIMPLE_PRODUCT')
export class SimpleProduct extends BuyableProduct {
  @ManyToOne(() => File, (file) => file.simpleproduct)
  primaryImage: File;

  @OneToMany(() => File, (file) => file.simpleproduct)
  images: File[];

  @OneToMany(
    () => ProductFeature,
    (productFeature) => productFeature.simpleProduct,
  )
  features: ProductFeature[] | string[];

  @OneToMany(
    () => ProductBanner,
    (productBanner) => productBanner.simpleProduct,
  )
  banners: ProductBanner[] | string[];

  @OneToMany(
    () => ProductKeyWord,
    (productKeyWord) => productKeyWord.simpleProduct,
  )
  keyWords: ProductKeyWord[] | string[];

  @OneToMany(
    () => ProductWarning,
    (productWarning) => productWarning.simpleProduct,
  )
  warnings: ProductWarning[] | string[];

  @OneToMany(
    () => ProductViewHistory,
    (productViewHistory) => productViewHistory.simpleProduct,
  )
  productViewHistories: ProductViewHistory[] | string[];

  @OneToMany(
    () => Specification,
    (specification) => specification.simpleProduct,
  )
  specifications: Specification[];

  @Column()
  arName: string;

  @Column({
    default: false,
  })
  isApproved: boolean;

  @Column()
  rating: number;

  @Column()
  name: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column('simple-array')
  searchTerms: string[];

  @Column()
  legalDisclaimer: string;

  @Column({
    nullable: true,
  })
  brand: string;

  @Column()
  manufacturer: string;

  @Column()
  manufactureSerial: string;

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    default: ProductTypeEnum.SIMPLE_LISTING,
  })
  type: ProductTypeEnum = ProductTypeEnum.SIMPLE_LISTING;

  @Column({
    default: false,
  })
  isActive: boolean;

  @OneToMany(() => ProductReview, (review) => review.product)
  reviews: ProductReview[] | string[];

  @ManyToMany(
    () => AttributeChoice,
    (attributeChoice) => attributeChoice.simpleProducts,
  )
  @JoinTable()
  attributeChoices: AttributeChoice[];

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.simpleProduct,
  )
  attributeValues: AttributeValue[];

  @Column({
    nullable: true,
  })
  rejectReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity('VARIATION')
export class Variation extends BuyableProduct {
  @ManyToMany(
    () => AttributeChoice,
    (attributeChoice) => attributeChoice.variations,
  )
  @JoinTable()
  variationAttributeChoices: AttributeChoice[];

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    default: ProductTypeEnum.VARIATION,
  })
  type: ProductTypeEnum = ProductTypeEnum.VARIATION;

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.variation)
  variationAttributeValues: AttributeValue[];

  @ManyToOne(() => ParentListing, (parentListing) => parentListing.variations)
  parentListing: IParentListing | string;
}

@ChildEntity('PARENT_LISTING')
export class ParentListing extends Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Variation, (variation) => variation.parentListing)
  variations: Variation[];

  @Column({
    default: false,
  })
  isActive: boolean;

  @ManyToOne(
    () => VariationTheme,
    (VariationTheme) => VariationTheme.parentListings,
  )
  variationTheme: IVariationTheme | string;

  @OneToMany(
    () => ProductViewHistory,
    (productViewHistory) => productViewHistory.simpleProduct,
  )
  productViewHistories: ProductViewHistory[] | string[];

  @Column()
  name: string;

  @Column()
  arName: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column()
  brand: string;

  @Column()
  manufacturer: string;

  @Column()
  manufactureSerial: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.parentListings)
  vendor: Vendor | string;

  @OneToMany(
    () => Specification,
    (specification) => specification.parentListing,
  )
  specifications: Specification[];

  @OneToMany(
    () => ProductBanner,
    (productBanner) => productBanner.parentListing,
  )
  banners: ProductBanner[] | string[];

  @OneToMany(
    () => ProductFeature,
    (productFeature) => productFeature.parentListing,
  )
  features: ProductFeature[] | string[];

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
    default: ProductTypeEnum.PARENT_LISTING,
  })
  type: ProductTypeEnum = ProductTypeEnum.PARENT_LISTING;

  @OneToMany(
    () => ProductKeyWord,
    (productKeyword) => productKeyword.parentListing,
  )
  keyWords: ProductKeyWord[] | string[];

  @OneToMany(
    () => ProductWarning,
    (productWarning) => productWarning.parentListing,
  )
  warnings: ProductWarning[] | string[];

  @Column('simple-array')
  searchTerms: string[];

  @ManyToOne(() => File, (file) => file.parentlisting)
  primaryImage: File;

  @OneToMany(() => File, (file) => file.parentlisting)
  images: File[];

  @Column()
  legalDisclaimer: string;

  @Column({
    default: false,
  })
  isApproved: boolean;

  @ManyToMany(
    () => AttributeChoice,
    (attributeChoice) => attributeChoice.parentListings,
  )
  @JoinTable()
  attributeChoices: AttributeChoice[];

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.parentListing,
  )
  attributeValues: AttributeValue[];

  @Column({
    nullable: true,
  })
  rejectReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
