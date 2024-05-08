import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductWarningEnum } from '../enums/product-warning.enum';
import { SimpleProduct, ParentListing } from './product.entity';

@Entity()
export class ProductWarning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProductWarningEnum,
  })
  value: ProductWarningEnum;

  @ManyToOne(() => SimpleProduct, (simpleProduct) => simpleProduct.warnings)
  simpleProduct: SimpleProduct | string;

  @ManyToOne(() => ParentListing, (parentListing) => parentListing.warnings)
  parentListing: ParentListing | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
