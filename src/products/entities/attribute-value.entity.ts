import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAttributeValue } from '../interfaces/attribute-value.interface';
import { IAttribute } from '../interfaces/attribute.interface';
import { Attribute } from './attribute.entity';
import { ParentListing, SimpleProduct, Variation } from './product.entity';

@Entity()
export class AttributeValue implements IAttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => Attribute, (attribue) => attribue.attributeValues)
  attribute: IAttribute | string;

  @ManyToOne(
    () => SimpleProduct,
    (simpleProduct) => simpleProduct.attributeValues,
  )
  simpleProduct: SimpleProduct | string;

  @ManyToOne(
    () => ParentListing,
    (parentListing) => parentListing.attributeValues,
  )
  parentListing: ParentListing | string;

  @ManyToOne(() => Variation, (variation) => variation.variationAttributeValues)
  variation: Variation | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
