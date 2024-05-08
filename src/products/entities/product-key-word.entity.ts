import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SimpleProduct, ParentListing } from './product.entity';

@Entity()
export class ProductKeyWord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => SimpleProduct, (simpleProduct) => simpleProduct.keyWords)
  simpleProduct: SimpleProduct | string;

  @ManyToOne(() => ParentListing, (parentListing) => parentListing.keyWords)
  parentListing: ParentListing | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
