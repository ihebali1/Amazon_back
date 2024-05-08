import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FileRepository } from 'src/file/repositories/file.repository';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';
import { TransporterRepository } from './repositories/transporter.repository';
import * as bcrypt from 'bcrypt';
import { OrderStatusEnum } from 'src/order-product/enums/order-staus.enum';
import { Order } from 'src/order-product/entities/order.entity';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { FindTransporterOrdersDto } from './dto/find-transporter-order.dto';
import { Transporter } from 'src/users/entities/users.entity';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { UserCreatedEvent } from 'src/notification/events/user-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TransporterService {
  constructor(
    private transporterRepository: TransporterRepository,
    private orderRepository: OrderRepository,
    private fileRepository: FileRepository,
    private eventEmitter: EventEmitter2,
  ) { }

  async create(createTransporterDto: CreateTransporterDto) {
    if (
      await this.transporterRepository.findTransporterByEmailOrPhone(
        createTransporterDto.email,
        createTransporterDto.phone,
      )
    )
      throw new ConflictException('DUPLICATED PHONE OR EMAIL');
    const transporter = new Transporter();
    const generatedPassword = bcrypt.hashSync('12345678', 8);
    transporter.password = generatedPassword;
    transporter.firstName = createTransporterDto.firstName;
    transporter.lastName = createTransporterDto.lastName;
    transporter.email = createTransporterDto.email;
    transporter.phone = createTransporterDto.phone;
    transporter.driveLicenceExpiry = createTransporterDto.driveLicenceExpiry;
    transporter.dateBirth = createTransporterDto.birthDate;

    const createdTransporter = await this.transporterRepository.findOne(
      (
        await this.transporterRepository.save(transporter)
      ).id,
      {
        relations: ['driveLicence', 'greyCards'],
      },
    );

    const fetchedDriverLicence = await this.fileRepository.findOne(
      createTransporterDto.driveLicence,
    );

    for (const greyCard of createTransporterDto.greyCards) {
      const fetchedGreyCard = await this.fileRepository.findOne(greyCard);
      createdTransporter.greyCards.push(fetchedGreyCard);
    }

    createdTransporter.driveLicence = fetchedDriverLicence;
    await this.transporterRepository.save(createdTransporter);
    if (createdTransporter) this.eventEmitter.emit('user.created', {
      user: createdTransporter.id,
      type: NotificationTypeEnum.USER,
      target: NotificationTargetEnum.USER,
      userIds: [createdTransporter.id],
    } as UserCreatedEvent);
  }

  public async findByEmail(email: string): Promise<Transporter> {
    const transporter = await this.transporterRepository.findOne({
      where: { email: email },
      select: ['password', 'email', 'id'],
    });

    if (!transporter) {
      throw new NotFoundException(`Transporter ${email} not found`);
    }

    return transporter;
  }

  public async findByPhone(phone: string): Promise<Transporter> {
    const transporter = await this.transporterRepository.findOne({
      where: { phone: phone },
      select: ['password', 'email', 'phone', 'id', 'firstName', 'lastName'],
    });

    if (!transporter) {
      throw new NotFoundException(`Transporter ${phone} not found`);
    }

    return transporter;
  }

  public async isEmailExist(email: string): Promise<boolean> {
    const transporter = await this.transporterRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!transporter) {
      return false;
    }

    return true;
  }
  findAll() {
    return this.transporterRepository.find({
      relations: ['driveLicence', 'greyCards'],
    });
  }
  async findOrderTransporteAvailable() {
    return this.orderRepository.find({
      where: { status: OrderStatusEnum.ORDERED },
    });
  }
  findOne(id: string) {
    return this.transporterRepository.findOne(id, {
      relations: ['driveLicence', 'greyCards'],
    });
  }

  async update(id: string, updateTransporterDto: UpdateTransporterDto) {
    /*if (
      await this.transporterRepository.findTransporterByEmailOrPhone(
        updateTransporterDto.email,
        updateTransporterDto.phone,
      )
    )
      throw new ConflictException('DUPLICATED PHONE OR EMAIL');*/
    //@TODO FIX CONFLICT IN UPDATE
    const fetchedTransporter = await this.transporterRepository.findOne(id, {
      relations: ['driveLicence', 'greyCards'],
    });
    fetchedTransporter.firstName = updateTransporterDto.firstName;
    fetchedTransporter.lastName = updateTransporterDto.lastName;
    fetchedTransporter.dateBirth = updateTransporterDto.birthDate;
    fetchedTransporter.email = updateTransporterDto.email;
    fetchedTransporter.phone = updateTransporterDto.phone;
    if (updateTransporterDto.driveLicence) {
      const fetchedDriverLicence = await this.fileRepository.findOne(
        updateTransporterDto.driveLicence,
      );
      fetchedTransporter.driveLicence = fetchedDriverLicence;
    }

    if (updateTransporterDto.greyCards) {
      fetchedTransporter.greyCards = [];
      for (const greyCard of updateTransporterDto.greyCards) {
        const fetchedGreyCard = await this.fileRepository.findOne(greyCard);
        fetchedTransporter.greyCards.push(fetchedGreyCard);
      }
    }
    await this.transporterRepository.save(fetchedTransporter);
  }
  findTransporterAssignedOrders(
    transporterId: string,
    findTransporterOrdersDto: FindTransporterOrdersDto,
  ) {
    return this.orderRepository.findOrdersTransporter(
      transporterId,
      findTransporterOrdersDto,
    );
  }

  findOrderTransporter(transporterId: string, orderId: string) {
    return this.orderRepository.findTransporterOrder(transporterId, orderId);
  }

  async accept(transporterId: string, orderId: string) {
    const fetchedTransporter = await this.transporterRepository.findOne(
      transporterId,
    );
    if (!fetchedTransporter)
      throw new NotFoundException('transporter not found');
    const fetchedOrder = await this.orderRepository.findOne(orderId, {
      relations: ['assignedTransporter'],
    });
    if (fetchedOrder.assignedTransporter != null)
      throw new ConflictException('ORDER ALREADY ASSIGNED!');
    if (fetchedOrder.status != OrderStatusEnum.ORDERED)
      throw new ConflictException('ORDER ALREADY ASSIGNED');
    fetchedOrder.assignedTransporter = fetchedTransporter;
    fetchedOrder.status = OrderStatusEnum.INDELIVERY;

    return this.orderRepository.save(fetchedOrder);
  }

  async deliverOrder(transporterId: string) {
    const fetchedTransporter = await this.transporterRepository.findOne(
      transporterId,
    );
    if (!fetchedTransporter) throw new NotFoundException('livreur not found');

    fetchedTransporter.status = OrderStatusEnum.DELIVERED;

    return this.transporterRepository.save(fetchedTransporter);
  }

  async activateTransporter(id: string) {
    const fetchedTransporter = await this.transporterRepository.findOne(id);
    fetchedTransporter.active = true;
    await this.transporterRepository.save(fetchedTransporter);
  }

  async desactivateTransporter(id: string) {
    const fetchedTransporter = await this.transporterRepository.findOne(id);
    fetchedTransporter.active = false;
    await this.transporterRepository.save(fetchedTransporter);
  }
}
