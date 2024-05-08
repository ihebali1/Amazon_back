import { Injectable } from '@nestjs/common';
import { CreateVariationThemeDto } from '../dto/create-variation-theme.dto';
import { UpdateVariationThemeDto } from '../dto/update-variation-theme.dto';
import { AttributeRepository } from '../repositories/attribute.repository';
import { VariationThemeRepository } from '../repositories/variation-theme.repository';

@Injectable()
export class VariationThemesService {
  constructor(
    private variationThemeRepository: VariationThemeRepository,
    private attributeRepository: AttributeRepository,
  ) {}
  create(createVariationThemeDto: CreateVariationThemeDto) {
    return this.variationThemeRepository.save(createVariationThemeDto);
  }

  findAll() {
    return this.variationThemeRepository.find();
  }

  findOne(id: string) {
    return this.variationThemeRepository.findOne(id, {
      relations: ['attributes'],
    });
  }

  async findAvailableAttributes(id: string) {
    const variationTheme = await this.variationThemeRepository.findOne(id, {
      relations: ['attributes'],
    });
    const attributes = await this.attributeRepository.find({
      relations: ['variationThemes'],
    });
    const availableAttributes = [];
    attributes.forEach((attribute) => {
      let exist = false;
      variationTheme.attributes.forEach((att) => {
        if (att.id == attribute.id) {
          exist = true;
        }
      });
      if (exist == false) availableAttributes.push(attribute);
    });
    return availableAttributes;
  }

  async update(id: string, updateVariationThemeDto: UpdateVariationThemeDto) {
    const variationTheme = await this.findOne(id);
    variationTheme.name = updateVariationThemeDto.name;
    return this.variationThemeRepository.save(variationTheme);
  }

  async remove(id: string) {
    const variationTheme = await this.findOne(id);
    return this.variationThemeRepository.remove(variationTheme);
  }

  async findByChildCategory(categoryId: string) {
    return this.variationThemeRepository.getVariationThemesByChildCategory(
      categoryId,
    );
  }

  async addAttribute(variationThemeId: string, attributeId: string) {
    const variationTheme = await this.variationThemeRepository.findOne(
      variationThemeId,
      {
        relations: ['attributes'],
      },
    );
    const attribute = await this.attributeRepository.findOne(attributeId);
    //@TODO check variation theme and attribute have childCategory in common
    variationTheme.attributes.push(attribute);
    return this.variationThemeRepository.save(variationTheme);
  }

  async removeAttribute(variationThemeId: string, attributeId: string) {
    const variationTheme = await this.findOne(variationThemeId);
    variationTheme.attributes = variationTheme.attributes.filter(
      (attribute) => {
        return attribute.id !== attributeId;
      },
    );
    return this.variationThemeRepository.save(variationTheme);
  }
}
