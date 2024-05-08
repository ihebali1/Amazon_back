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
export class ProductFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => SimpleProduct, (simpleProduct) => simpleProduct.features)
  simpleProduct: SimpleProduct | string;

  @ManyToOne(() => ParentListing, (parentListing) => parentListing.features)
  parentListing: ParentListing | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
