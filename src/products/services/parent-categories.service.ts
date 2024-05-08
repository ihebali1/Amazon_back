import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParentCategoryDto } from '../dto/create-parent-category.dto';
import { UpdateParentCategoryDto } from '../dto/update-parent-category.dto';
import { ParentCategory } from '../entities/parent-category.entity';
import { ChildCategoryRepository } from '../repositories/child-category.repository';
import { DepartmentRepository } from '../repositories/department.repository';
import { ParentCategoryRepository } from '../repositories/parent-category.repository';

@Injectable()
export class ParentCategoriesService {
  constructor(
    private departmentRepository: DepartmentRepository,
    private parentCategoryRepository: ParentCategoryRepository,
    private childCategoryRepository: ChildCategoryRepository,
  ) {}
  async create(createParentCategoryDto: CreateParentCategoryDto) {
    const parentCategory = new ParentCategory();
    parentCategory.arName = createParentCategoryDto.arName;
    parentCategory.name = createParentCategoryDto.name;
    parentCategory.image = createParentCategoryDto.image;

    const createdParentCategory = await this.parentCategoryRepository.findOne(
      (
        await this.parentCategoryRepository.save(parentCategory)
      ).id,
      { relations: ['departments'] },
    );
    if (createParentCategoryDto.department) {
      const fetchedDepartment = await this.departmentRepository.findOne(
        createParentCategoryDto.department,
      );
      if (!fetchedDepartment)
        throw new NotFoundException('DEPARTMENT NOT FOUND');
      createdParentCategory.departments.push(fetchedDepartment);
      await this.parentCategoryRepository.save(createdParentCategory);
    }
  }

  findAll() {
    return this.parentCategoryRepository.find({
      relations: ['childCategories', 'departments', 'image'],
    });
  }

  findAllOrdered() {
    return this.parentCategoryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.parentCategoryRepository.findOne(id, {
      relations: ['childCategories', 'image'],
    });
  }

  async update(id: string, updateParentCategoryDto: UpdateParentCategoryDto) {
    try {
      const parentCategory = await this.findOne(id);
      parentCategory.name = updateParentCategoryDto.name;
      parentCategory.arName = updateParentCategoryDto.arName;
      parentCategory.image = updateParentCategoryDto.image;
      return this.parentCategoryRepository.save(parentCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const parentCategory = await this.findOne(id);
      return this.parentCategoryRepository.remove(parentCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Add a child category to parent category
  async addChildCategory(id: string, childCategoryId: string) {
    try {
      const parentCategory = await this.findOne(id);
      const childCategory = await this.childCategoryRepository.findOne(
        childCategoryId,
        { relations: ['parentCategories'] },
      );
      childCategory.parentCategories.push(parentCategory);
      return this.childCategoryRepository.save(childCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Remove a child category from parent category
  async removeChildCategory(parentCategoryId: string, childCategoryId: string) {
    try {
      const parentCategory = await this.parentCategoryRepository.findOne(
        parentCategoryId,
        {
          relations: ['childCategories'],
        },
      );

      parentCategory.childCategories = parentCategory.childCategories.filter(
        (childCategory) => {
          return childCategory.id !== childCategoryId;
        },
      );
      return this.parentCategoryRepository.save(parentCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //Get available child categories to add
  async findAvailableChildCategories(parentCategoryId: string) {
    const childs = await this.childCategoryRepository.find({
      relations: ['parentCategories'],
    });
    const parentCategory = await this.parentCategoryRepository.findOne(
      parentCategoryId,
      {
        relations: ['childCategories'],
      },
    );
    const availableChilds = [];
    childs.forEach((childCategory) => {
      let exist = false;
      parentCategory.childCategories.forEach((child) => {
        if (child.id == childCategory.id) {
          exist = true;
        }
      });
      if (exist == false) availableChilds.push(childCategory);
    });
    return availableChilds;
  }
}
