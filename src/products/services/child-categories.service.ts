import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChildCategoryDto } from '../dto/create-child-category.dto';
import { UpdateChildCategoryDto } from '../dto/update-child-category.dto';
import { ChildCategory } from '../entities/child-category.entity';
import { AttributeRepository } from '../repositories/attribute.repository';
import { ChildCategoryRepository } from '../repositories/child-category.repository';
import { ParentCategoryRepository } from '../repositories/parent-category.repository';
import { VariationThemeRepository } from '../repositories/variation-theme.repository';

@Injectable()
export class ChildCategoriesService {
  constructor(
    private parentCategoryRepository: ParentCategoryRepository,
    private childCategoryRepository: ChildCategoryRepository,
    private attributeRepository: AttributeRepository,
    private variationThemeRepository: VariationThemeRepository,
  ) {}
  async create(createChildCategoryDto: CreateChildCategoryDto) {
    const childCategory = new ChildCategory();
    childCategory.arName = createChildCategoryDto.arName;
    childCategory.name = createChildCategoryDto.name;

    const createdChildCategory = await this.childCategoryRepository.findOne(
      (
        await this.childCategoryRepository.save(childCategory)
      ).id,
      { relations: ['parentCategories'] },
    );
    if (createChildCategoryDto.parentCategory) {
      const fetchedParentCategory = await this.parentCategoryRepository.findOne(
        createChildCategoryDto.parentCategory,
      );
      createdChildCategory.parentCategories.push(fetchedParentCategory);
      await this.childCategoryRepository.save(createdChildCategory);
    }
  }

  findAll() {
    return this.childCategoryRepository.find({
      relations: ['parentCategories'],
    });
  }

  findByName(name: string) {
    return this.childCategoryRepository.findByName(name);
  }

  //Get available attributes categories to add
  async findAvailableAttributes(childCategoryId: string) {
    const attributes = await this.attributeRepository.find({
      relations: ['childCategories'],
    });
    const childCategory = await this.childCategoryRepository.findOne(
      childCategoryId,
      {
        relations: ['attributes'],
      },
    );
    const availableAttributes = [];
    attributes.forEach((attribute) => {
      let exist = false;
      childCategory.attributes.forEach((att) => {
        if (att.id == attribute.id) {
          exist = true;
        }
      });
      if (exist == false) availableAttributes.push(attribute);
    });
    return availableAttributes;
  }

  //Get available variations to add
  async findAvailableVariationThemes(childCategoryId: string) {
    const variationThemes = await this.variationThemeRepository.find({
      relations: ['childCategories'],
    });
    const childCategory = await this.childCategoryRepository.findOne(
      childCategoryId,
      {
        relations: ['variationThemes'],
      },
    );
    const availableVariations = [];
    variationThemes.forEach((vt) => {
      let exist = false;
      childCategory.variationThemes.forEach((v) => {
        if (v.id == vt.id) {
          exist = true;
        }
      });
      if (exist == false) availableVariations.push(vt);
    });
    return availableVariations;
  }

  findOne(id: string) {
    return this.childCategoryRepository.findOne(id, {
      relations: [
        'attributes',
        'variationThemes',
        'variationThemes.attributes',
        'variationThemes.attributes.attributeChoices',
      ],
    });
  }

  findOneWithDetails(id: string) {
    return this.childCategoryRepository.findOne(id, {
      relations: [
        'attributes',
        'attributes.attributeChoices',
        'parentCategories',
        'parentCategories.departments',
        'variationThemes',
        'variationThemes.attributes',
        'variationThemes.attributes.attributeChoices',
      ],
    });
  }

  async update(id: string, updateChildCategoryDto: UpdateChildCategoryDto) {
    try {
      const childCategory = await this.findOne(id);
      childCategory.name = updateChildCategoryDto.name;
      childCategory.arName = updateChildCategoryDto.arName;
      return this.childCategoryRepository.save(childCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const childCategory = await this.findOne(id);
      return this.childCategoryRepository.remove(childCategory);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Add attribute to child category
  async addAttribute(id: string, attributeId: string) {
    try {
      const childCategory = await this.findOne(id);
      const attribute = await this.attributeRepository.findOne(attributeId, {
        relations: ['childCategories'],
      });
      attribute.childCategories.push(childCategory);
      return this.attributeRepository.save(attribute);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Add variation theme to child category
  async addVariationTheme(id: string, vtId: string) {
    try {
      const childCategory = await this.findOne(id);
      const vt = await this.variationThemeRepository.findOne(vtId, {
        relations: ['childCategories'],
      });
      vt.childCategories.push(childCategory);
      return this.variationThemeRepository.save(vt);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Remove attribute from child category
  async removeAttribute(id: string, attributeId: string) {
    try {
      const attribute = await this.attributeRepository.findOne(attributeId, {
        relations: ['childCategories'],
      });

      attribute.childCategories = attribute.childCategories.filter(
        (childCategory) => {
          return childCategory.id !== id;
        },
      );
      return this.attributeRepository.save(attribute);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // Remove variation theme from child category
  async removeVariationTheme(id: string, vtId: string) {
    try {
      const vt = await this.variationThemeRepository.findOne(vtId, {
        relations: ['childCategories'],
      });

      vt.childCategories = vt.childCategories.filter((childCategory) => {
        return childCategory.id !== id;
      });
      return this.variationThemeRepository.save(vt);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
