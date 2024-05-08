import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDepartment } from '../interfaces/department.interface';
import { IParentCategory } from '../interfaces/parent-category.interface';
import { FeaturedDepartment } from './featured-department.entity';
import { ParentCategory } from './parent-category.entity';
import { File } from 'src/file/entities/file.entity';
import { DepartmentBanner } from 'src/banner/entities/banner.entity';
@Entity()
export class Department implements IDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arName: string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File | string;

  @OneToMany(
    () => DepartmentBanner,
    (departmentBanner) => departmentBanner.department,
  )
  banners: DepartmentBanner[] | string[];

  @ManyToMany(
    () => ParentCategory,
    (parentCategory) => parentCategory.departments,
  )
  parentCategories: IParentCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
