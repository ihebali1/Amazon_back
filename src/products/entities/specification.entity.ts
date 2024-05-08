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
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  arKey: string;

  @Column()
  value: string;

  @ManyToOne(() => SimpleProduct, (product) => product.specifications)
  simpleProduct: SimpleProduct | string;

  @ManyToOne(
    () => ParentListing,
    (parentListing) => parentListing.specifications,
  )
  parentListing: ParentListing | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
