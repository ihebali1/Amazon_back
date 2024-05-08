import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttributeChoiceDto } from '../dto/create-attribute-choice.dto';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { AttributeChoice } from '../entities/attribute-choice.entity';
import { AttributeTypeEnum } from '../enums/attribute-type.enum';
import { AttributeChoiceRepository } from '../repositories/attribute-choice.repository';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributesService {
  constructor(
    private attributeRepository: AttributeRepository,
    private attributeChoiceRepository: AttributeChoiceRepository,
  ) {}
  create(createAttributeDto: CreateAttributeDto) {
    return this.attributeRepository.save(createAttributeDto);
  }

  findAll() {
    return this.attributeRepository.find();
  }

  findOne(id: string) {
    return this.attributeRepository.findOne(id, {
      relations: ['attributeChoices'],
    });
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    try {
      const attribute = await this.findOne(id);
      if (updateAttributeDto.type == AttributeTypeEnum.SINGLE_CHOICE) {
        attribute.attributeChoices.forEach(async (attributeChoice) => {
          await this.attributeChoiceRepository.remove(attributeChoice);
        });
      }
      attribute.key = updateAttributeDto.key;
      attribute.arKey = updateAttributeDto.arKey;
      attribute.type = updateAttributeDto.type;
      attribute.attributeChoices = null;
      return this.attributeRepository.save(attribute);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: string) {
    try {
      const attribute = await this.findOne(id);
      return this.attributeRepository.remove(attribute);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async addChoice(
    id: string,
    createAttributeChoiceDto: CreateAttributeChoiceDto,
  ) {
    //@TODO add querry runner to manage transaction
    const attributeChoice = new AttributeChoice();
    attributeChoice.value = createAttributeChoiceDto.value;
    attributeChoice.type = createAttributeChoiceDto.type;
    attributeChoice.attribute = id;
    return this.attributeChoiceRepository.save(attributeChoice);
  }

  async removeChoice(id: string, choiceId: string) {
    //@TODO add querry runner to manage transaction
    const attribute = await this.attributeRepository.findOne(id, {
      relations: ['attributeChoices'],
    });

    attribute.attributeChoices = attribute.attributeChoices.filter(
      (attributeChoice) => {
        return attributeChoice.id !== choiceId;
      },
    );

    const choice = await this.attributeChoiceRepository.findOne(choiceId);
    await this.attributeChoiceRepository.remove(choice);
    return this.attributeRepository.save(attribute);
  }
}
