import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChoiceTypeEnum } from '../enums/choice-type.enum';
import { IAttributeChoice } from '../interfaces/attribute-choice.interface';
import { IAttribute } from '../interfaces/attribute.interface';
import { Attribute } from './attribute.entity';
import { SimpleProduct, ParentListing, Variation } from './product.entity';

@Entity()
export class AttributeChoice implements IAttributeChoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column({ default: 0 })
  order: number;

  @Column({
    type: 'enum',
    enum: ChoiceTypeEnum,
  })
  type: ChoiceTypeEnum;

  @ManyToOne(() => Attribute, (attribue) => attribue.attributeChoices)
  attribute: IAttribute | string;

  @ManyToMany(
    () => SimpleProduct,
    (simpleProduct) => simpleProduct.attributeChoices,
  )
  simpleProducts: SimpleProduct[];

  @ManyToMany(
    () => ParentListing,
    (parentListing) => parentListing.attributeChoices,
  )
  parentListings: ParentListing[];

  @ManyToMany(
    () => Variation,
    (variation) => variation.variationAttributeChoices,
  )
  variations: Variation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
