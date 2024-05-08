import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCreditCardDto } from '../dto/create-creditCard.dto';
import { UpdateCreditCardDto } from '../dto/update-CreditCard.dto';
import { CreditCardService } from '../services/CreditCard.service';

@ApiTags('CreditCard')
@Controller('creditCards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}
  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.creat(createCreditCardDto);
  }
  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCreditCardDto,
  ) {
    return this.creditCardService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardService.remove(id);
  }
}
