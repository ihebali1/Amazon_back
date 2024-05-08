import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IParentListing } from '../interfaces/parent-listing-interface';
import { IVariationTheme } from '../interfaces/variation-theme.interface';
import { Attribute } from './attribute.entity';
import { ChildCategory } from './child-category.entity';
import { ParentListing } from 'src/products/entities/product.entity';

@Entity()
export class VariationTheme implements IVariationTheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => ChildCategory,
    (childCategory) => childCategory.variationThemes,
  )
  childCategories: ChildCategory[];

  @OneToMany(
    () => ParentListing,
    (parentListing) => parentListing.variationTheme,
  )
  parentListings: IParentListing[] | string[];

  @ManyToMany(() => Attribute, (attribute) => attribute.variationThemes)
  @JoinTable()
  attributes: Attribute[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
