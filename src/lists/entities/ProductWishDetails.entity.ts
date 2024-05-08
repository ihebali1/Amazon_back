import { BuyableProduct } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WishProductPriorityEnum } from '../enums/wish-product-priority.enum';
import { IProductWishDetails } from '../interfaces/ProductWishDetails.interface';
import { IWishList } from '../interfaces/WishList.interface';
import { WishList } from './WishList.entity';

@Entity()
export class ProductWishDetails implements IProductWishDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  needs: number;

  @Column()
  has: number;

  @Column({
    type: 'enum',
    enum: WishProductPriorityEnum,
  })
  priority: WishProductPriorityEnum;

  @ManyToOne(() => BuyableProduct, (product) => product.productWishDetails)
  product: BuyableProduct | string;

  @ManyToOne(() => WishList, (wishList) => wishList.productWishDetails)
  wishList: IWishList | string;
}
