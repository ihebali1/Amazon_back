import { SimpleProduct, ParentListing } from 'src/products/entities/product.entity';
import { Client } from 'src/users/entities/users.entity';
import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export abstract class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  viewCount: number;

  @Column()
  lastViewAt: Date;

  @ManyToOne(() => Client, (client) => client.productViewHistories)
  client: Client | string;
}

@ChildEntity('PRODUCT_VIEW_HISTORY')
export class ProductViewHistory extends History {
  @ManyToOne(
    () => SimpleProduct,
    (simpleProduct) => simpleProduct.productViewHistories,
  )
  simpleProduct: SimpleProduct | string;

  @ManyToOne(
    () => ParentListing,
    (parentListing) => parentListing.productViewHistories,
  )
  parentListing: ParentListing | string;
}
