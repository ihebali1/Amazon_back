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
import { CreateAccountGiftCardDto } from '../dto/create-accountGiftCard.dto';
import { UpdateaccountGiftCardDto } from '../dto/update-accountGiftCard.dto';
import { AccountGiftCardService } from '../services/accountGiftCard.service';

@ApiTags('AccountGiftCard')
@Controller('accountGiftCards')
export class AccountGiftCardController {
  constructor(
    private readonly accountGiftCardService: AccountGiftCardService,
  ) {}
  @Post()
  create(@Body() createAccountGiftCardDto: CreateAccountGiftCardDto) {
    return this.accountGiftCardService.creat(createAccountGiftCardDto);
  }
  @Get()
  findAll() {
    return this.accountGiftCardService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountGiftCardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateaccountGiftCardDto,
  ) {
    return this.accountGiftCardService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountGiftCardService.remove(id);
  }
}
