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
import { CreatePersonalCheckingAccountDto } from '../dto/create-personalCheckingAccount.dto';
import { UpdatePersonalCheckingAccountDto } from '../dto/update-personalCheckingAccount.dto';
import { PersonalCheckingAccountService } from '../services/personalCheckingAccount.service';

@ApiTags('PersonalCheckingAccount')
@Controller('personalCheckingAccounts')
export class PersonalCheckingAccountController {
  constructor(
    private readonly personalCheckingAccountService: PersonalCheckingAccountService,
  ) {}
  @Post()
  create(
    @Body() createPersonalCheckingAccountDto: CreatePersonalCheckingAccountDto,
  ) {
    return this.personalCheckingAccountService.creat(
      createPersonalCheckingAccountDto,
    );
  }
  @Get()
  findAll() {
    return this.personalCheckingAccountService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalCheckingAccountService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdatePersonalCheckingAccountDto,
  ) {
    return this.personalCheckingAccountService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalCheckingAccountService.remove(id);
  }
}
