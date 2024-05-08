import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateInfoDto } from '../dto/update-info.dto';
import { Users } from '../entities/users.entity';
import { ClientService } from '../services/client.service';

@ApiTags('Client')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  find(@CurrentUser() user: Users) {
    return this.clientService.findClientById(user.id);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateInfo(@CurrentUser() user: Users, @Body() updateInfoDto: UpdateInfoDto) {
    return this.clientService.updateInfo(user.id, updateInfoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('addresses/add')
  addShippingAddress(
    @CurrentUser() user: Users,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.clientService.addAddressToClient(user.id, createAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('addresses/:addresId/remove')
  removeShippingAddress(
    @Param('addresId') addresId: string,
    @CurrentUser() user: Users,
  ) {
    return this.clientService.removeAddressFromClient(user.id, addresId);
  }
}
