import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department.entity';
import { FeaturedDepartment } from '../entities/featured-department.entity';
import { ChildCategoryRepository } from '../repositories/child-category.repository';
import { DepartmentRepository } from '../repositories/department.repository';
import { FeaturedDepartmentRepository } from '../repositories/featured-department.repository';
import { ParentCategoryRepository } from '../repositories/parent-category.repository';

@Injectable()
export class DepartmentsService {
  constructor(
    private departmentRepository: DepartmentRepository,
    private parentCategoryRepository: ParentCategoryRepository,
    private childCategoryRepository: ChildCategoryRepository,
    private featuredDepartmentRepository: FeaturedDepartmentRepository,
  ) { }
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.save(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepository.find({
      relations: [
        'parentCategories',
        'parentCategories.image',
        'parentCategories.childCategories',
        'image',
      ],
    });
  }

  findFeaturedDepartments() {
    return this.featuredDepartmentRepository.find();
  }

  findWeekTopList() {
    return this.departmentRepository.findToWeekDepartments();
  }

  findTopWeekDepartments() {
    return this.departmentRepository.findToWeekDepartments();
  }

  async findAllWithChildCategories() {
    const departments = await this.departmentRepository.find();
    const departmentList = [];
    for (const department of departments) {
      const childCategories =
        await this.childCategoryRepository.findByDepartment(department.id);
      departmentList.push({
        department: department,
        childCategories: childCategories,
      });
      console.log(departmentList);
    }
    return departmentList;
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne(id, {
      relations: [
        'parentCategories',
        'image',
        'parentCategories.image',
        'parentCategories.childCategories',
        'banners',
        'banners.image'
      ],
    });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const department = await this.findOne(id);
      department.name = updateDepartmentDto.name;
      department.arName = updateDepartmentDto.arName;
      department.image = updateDepartmentDto.image;
      return this.departmentRepository.save(department);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const department = await this.findOne(id);
      return this.departmentRepository.remove(department);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Add a parent category to department
  async addParentCategory(id: string, parentCategoryId: string) {
    try {
      const department = await this.findOne(id);
      const parentCategory = await this.parentCategoryRepository.findOne(
        parentCategoryId,
        { relations: ['departments'] },
      );
      parentCategory.departments.push(department);
      return this.parentCategoryRepository.save(parentCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Remove a parent category from department
  async removeParentCategory(depatementId: string, parentCategoryId: string) {
    try {
      const department = await this.departmentRepository.findOne(depatementId, {
        relations: ['parentCategories'],
      });

      department.parentCategories = department.parentCategories.filter(
        (parentCategory) => {
          return parentCategory.id !== parentCategoryId;
        },
      );
      return this.departmentRepository.save(department);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //Get available parent categories to add
  async findAvailableParentCategories(departmentId: string) {
    const parents = await this.parentCategoryRepository.find({
      relations: ['departments'],
    });
    const department = await this.departmentRepository.findOne(departmentId, {
      relations: ['parentCategories'],
    });
    console.log(department);
    console.log(parents);
    const availableParents = [];
    parents.forEach((parentCategory) => {
      let exist = false;
      department.parentCategories.forEach((parent) => {
        if (parent.id == parentCategory.id) {
          exist = true;
        }
      });
      if (exist == false) availableParents.push(parentCategory);
    });
    return availableParents;
  }

  addFeaturedDepartment(departmentId: string) {
    const featuredProduct = new FeaturedDepartment();
    featuredProduct.department = departmentId;
    return this.featuredDepartmentRepository.save(featuredProduct);
  }

  removeFeaturedDepartment(departmentId: string) {
    return this.featuredDepartmentRepository.delete(departmentId);
  }
}
