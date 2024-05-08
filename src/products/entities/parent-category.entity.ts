import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IChildCategory } from '../interfaces/child-category.interface';
import { IDepartment } from '../interfaces/department.interface';
import { IParentCategory } from '../interfaces/parent-category.interface';
import { ChildCategory } from './child-category.entity';
import { Department } from './department.entity';
import { File } from 'src/file/entities/file.entity';
@Entity()
export class ParentCategory implements IParentCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arName: string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File | string;

  @ManyToMany(
    () => ChildCategory,
    (childCategory) => childCategory.parentCategories,
  )
  childCategories: IChildCategory[];

  @ManyToMany(() => Department, (department) => department.parentCategories)
  @JoinTable()
  departments: IDepartment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
