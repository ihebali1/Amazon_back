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
import { IParentCategory } from '../interfaces/parent-category.interface';
import { Attribute } from './attribute.entity';
import { ParentCategory } from './parent-category.entity';
import { VariationTheme } from './variation-theme.entity';
import { Product } from './product.entity';

@Entity()
export class ChildCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arName: string;

  @OneToMany(() => Product, (product) => product.childCategory)
  products: Product[] | string[];

  @ManyToMany(
    () => ParentCategory,
    (parentCategory) => parentCategory.childCategories,
  )
  @JoinTable()
  parentCategories: IParentCategory[];

  @ManyToMany(
    () => VariationTheme,
    (variationTheme) => variationTheme.childCategories,
  )
  @JoinTable()
  variationThemes: VariationTheme[];

  @ManyToMany(() => Attribute, (attribute) => attribute.childCategories)
  @JoinTable()
  attributes: Attribute[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
