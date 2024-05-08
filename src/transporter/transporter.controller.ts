import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransporterService } from './transporter.service';
import { UpdateTransporterDto } from './dto/update-transporter.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FindTransporterOrdersDto } from './dto/find-transporter-order.dto';
import { Transporter } from 'src/users/entities/users.entity';

@ApiTags('Transporter')
@Controller('transporters')
@UseGuards(JwtAuthGuard)
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) {}

  @Post()
  create(@Body() createTransporterDto: CreateTransporterDto) {
    try {
      return this.transporterService.create(createTransporterDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.transporterService.findAll();
  }

  @Get('me')
  getTransporterInfo(@CurrentUser() transporter: Transporter) {
    return this.transporterService.findOne(transporter.id);
  }

  @Get('/mine/:id')
  findAssignedOrderTransporter(
    @CurrentUser() transporter: Transporter,
    @Param('id') orderId: string,
  ) {
    return this.transporterService.findOrderTransporter(
      transporter.id,
      orderId,
    );
  }

  @Get('/mine')
  findTransporterAssignedOrders(
    @CurrentUser() transporter: Transporter,
    @Query() findTransporterOrdersDto: FindTransporterOrdersDto,
  ) {
    return this.transporterService.findTransporterAssignedOrders(
      transporter.id,
      findTransporterOrdersDto,
    );
  }

  @Get('/available')
  findOrderTransporterAvailable() {
    return this.transporterService.findOrderTransporteAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transporterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransporterDto: UpdateTransporterDto,
  ) {
    return this.transporterService.update(id, updateTransporterDto);
  }

  @Patch(':id/accept')
  accept(
    @CurrentUser() transporter: Transporter,
    @Param('id') orderId: string,
  ) {
    return this.transporterService.accept(transporter.id, orderId);
  }

  @Patch(':id/deliver')
  updateStatus(@CurrentUser() transporter: Transporter) {
    return this.transporterService.deliverOrder(transporter.id);
  }

  @Patch(':id/activate')
  activateTransporter(@Param('id') id: string) {
    return this.transporterService.activateTransporter(id);
  }

  @Patch(':id/desactivate')
  desactivateTransporter(@Param('id') id: string) {
    return this.transporterService.desactivateTransporter(id);
  }
}
