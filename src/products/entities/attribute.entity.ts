import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttributeTypeEnum } from '../enums/attribute-type.enum';
import { IAttributeValue } from '../interfaces/attribute-value.interface';
import { IAttribute } from '../interfaces/attribute.interface';
import { AttributeChoice } from './attribute-choice.entity';
import { AttributeValue } from './attribute-value.entity';
import { ChildCategory } from './child-category.entity';
import { VariationTheme } from './variation-theme.entity';

@Entity()
export class Attribute implements IAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  arKey: string;

  @Column({
    type: 'enum',
    enum: AttributeTypeEnum,
    default: AttributeTypeEnum.SINGLE_CHOICE,
  })
  type: AttributeTypeEnum;

  @Column({ default: false })
  isOrdered: boolean;

  @ManyToMany(() => ChildCategory, (childCategory) => childCategory.attributes)
  childCategories: ChildCategory[];

  @ManyToMany(
    () => VariationTheme,
    (variationTheme) => variationTheme.attributes,
  )
  variationThemes: VariationTheme[];

  @OneToMany(
    () => AttributeChoice,
    (attributeChoice) => attributeChoice.attribute,
  )
  attributeChoices: AttributeChoice[];

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: IAttributeValue[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
