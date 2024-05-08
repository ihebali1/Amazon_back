import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Income } from 'src/income/entities/income.entity';
import { IncomeStatusEnum } from 'src/income/enums/income-status.enum';
import { IncomeRepository } from 'src/income/repositories/income.repository';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { ReportCreatedEvent } from 'src/notification/events/report-created.event';
import { Order } from 'src/order-product/entities/order.entity';
import { OrderStatusEnum } from 'src/order-product/enums/order-staus.enum';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { Admin } from 'src/users/entities/admin.entity';
import { Client, Vendor } from 'src/users/entities/users.entity';
import { CreateReportMessageDto } from '../dto/create-message.dto';
import { CreateReportDto } from '../dto/create-report-order.dto';
import { FindReportDto } from '../dto/find-report.dto';
import { Message } from '../entities/message.entity';
import { ReportOrder } from '../entities/report.entity';
import { ReportFinalDecisonStatusEnum } from '../enums/report-final-decision-status.enum';
import { ReportStatusEnum } from '../enums/report-status.enum';
import { MessageRepository } from '../repositories/message.repository';
import { ReportOrderRepository } from '../repositories/report-order.repository';

@Injectable()
export class ReportService {
  constructor(
    private reportOrderRepository: ReportOrderRepository,
    private orderRepository: OrderRepository,
    private messageRepository: MessageRepository,
    private incomeRepository: IncomeRepository,
    private eventEmitter: EventEmitter2
  ) { }

  async create(
    userId: string,
    orderId: string,
    createReportDto: CreateReportDto,
  ) {
    const fetchedOrder = await this.orderRepository.findOne(orderId, {
      relations: ['vendor', 'income'],
    });
    if (fetchedOrder.status != OrderStatusEnum.DELIVERED) {
      throw new NotAcceptableException(
        'لم تستلم طلبك بعد ، لا يمكنك إضافة شكوى',
      );
    }

    if ((fetchedOrder.income as Income).status != IncomeStatusEnum.PENDING ) {
      throw new NotAcceptableException(
        `تمت معالجة الطلب بالفعل ، لا يمكنك إضافة أي شكوى`,
      );
    }

    const fetchedReport = await this.reportOrderRepository.findOne({
      where: { order: createReportDto.order },
    });
    if (fetchedReport)
      throw new BadRequestException('لديك بالفعل شكوى بشأن هذا الطلب');

    const reportOrder = new ReportOrder();
    const message = new Message();
    message.content = createReportDto.message;
    message.user = userId;
    if (createReportDto.image) message.image = createReportDto.image;
    if (createReportDto.video) message.video = createReportDto.video;
    const createdMessage = await this.messageRepository.save(message);
    reportOrder.order = createReportDto.order;
    reportOrder.createdBy = userId;
    const createdReport = await this.reportOrderRepository.save(reportOrder);
    createdMessage.report = createdReport;
    await this.messageRepository.save(createdMessage);
    console.log({
      report: createdReport.id,
      target: NotificationTargetEnum.USER,
      type: NotificationTypeEnum.REPORT,
      userIds: [(fetchedOrder.vendor as Vendor).id],
    })

    this.eventEmitter.emit('report.created', {
      report: createdReport.id,
      target: NotificationTargetEnum.USER,
      type: NotificationTypeEnum.REPORT,
      userIds: [(fetchedOrder.vendor as Vendor).id],
    } as ReportCreatedEvent);

    this.eventEmitter.emit('report.created', {
      report: createdReport.id,
      target: NotificationTargetEnum.ADMIN,
      type: NotificationTypeEnum.REPORT,
    } as ReportCreatedEvent);
  }

  async addMessage(
    userId: string,
    reportId: string,
    createReprtMessageDto: CreateReportMessageDto,
  ) {
    const fetchedReport = await this.reportOrderRepository.findOne({
      id: reportId,
    });
    if (!fetchedReport) throw new NotFoundException('report not found');
    if (
      fetchedReport.status == ReportFinalDecisonStatusEnum.ACCEPTED ||
      fetchedReport.status == ReportFinalDecisonStatusEnum.REJECTED
    )
      throw new NotAcceptableException(
        'تم إغلاق شكواك ، ولا يمكنك إرسال رسائل بعد الآن',
      );
    const message = new Message();
    message.content = createReprtMessageDto.message;
    if (createReprtMessageDto.image)
      message.image = createReprtMessageDto.image;
    if (createReprtMessageDto.video)
      message.video = createReprtMessageDto.video;
    message.report = fetchedReport;
    message.user = userId;
    return this.messageRepository.save(message);
  }

  findAll(findReportsFilter?: FindReportDto) {
    if (findReportsFilter && findReportsFilter.status) {
      return this.reportOrderRepository.find({
        relations: ['createdBy', 'assignedAdmin'],
        where: { status: findReportsFilter.status },
        order: { createdAt: 'DESC' },
      });
    }
    return this.reportOrderRepository.find({
      relations: ['createdBy', 'assignedAdmin'],
      order: { createdAt: 'DESC' },
    });
  }

  findAllByAdmin(adminId: string, findReportsFilter?: FindReportDto) {
    if (findReportsFilter && findReportsFilter.status)
      return this.reportOrderRepository.find({
        where: { assignedAdmin: adminId, status: findReportsFilter.status },
        relations: ['createdBy', 'assignedAdmin'],
        order: { createdAt: 'DESC' },
      });
    else
      return this.reportOrderRepository.find({
        where: { assignedAdmin: adminId },
        relations: ['createdBy', 'assignedAdmin'],
        order: { createdAt: 'DESC' },
      });
  }

  findReportMessages(reportId: string) {
    return this.messageRepository.find({
      where: { report: reportId },
      order: { createdAt: 'ASC' },
      relations: ['user', 'image', 'video', 'admin'],
    });
  }

  findOne(id: string) {
    return this.reportOrderRepository.findOne(id, {
      relations: [
        'createdBy',
        'assignedAdmin',
        'messages',
        'messages.user',
        'messages.admin',
        'order',
        'order.orderItems',
        'order.shippingInfo',
        'order.paymentInfo',
      ],
    });
  }

  async investigateReport(reportId: string, adminId: string) {
    const fetchedReport = await this.reportOrderRepository.findOne(reportId, {
      relations: ['assignedAdmin'],
    });
    if (!fetchedReport) throw new NotFoundException('REPORT NOT FOUND');
    if (fetchedReport.assignedAdmin != null)
      throw new ConflictException('تم تعيين الشكوى مسبقًا إلى مسؤول آخر');
    fetchedReport.assignedAdmin = adminId;
    fetchedReport.status = ReportStatusEnum.INREVIEW;
    return this.reportOrderRepository.save(fetchedReport);
  }

  async addAdminMessage(
    adminId: string,
    reportId: string,
    createReprtMessageDto: CreateReportMessageDto,
  ) {
    const fetchedReport = await this.reportOrderRepository.findOne(reportId, {
      relations: ['assignedAdmin'],
    });
    if (!fetchedReport) throw new NotFoundException('REPORT NOT FOUND');

    if (
      fetchedReport.assignedAdmin == null ||
      (fetchedReport?.assignedAdmin as Admin)?.id != adminId
    )
      throw new NotAcceptableException('يمكن للمسؤول المعين فقط إضافة رسالة');

    if (
      fetchedReport.status == ReportFinalDecisonStatusEnum.ACCEPTED ||
      fetchedReport.status == ReportFinalDecisonStatusEnum.REJECTED
    )
      throw new NotAcceptableException(
        'تم إغلاق شكواك ، ولا يمكنك إرسال رسائل بعد الآن',
      );

    const message = new Message();
    message.content = createReprtMessageDto.message;
    if (createReprtMessageDto.image)
      message.image = createReprtMessageDto.image;
    if (createReprtMessageDto.video)
      message.video = createReprtMessageDto.video;
    message.report = fetchedReport;
    message.admin = adminId;

    return this.messageRepository.save(message);
  }

  async updateReportStatus(
    adminId: string,
    reportId: string,
    incomeId: string,
    status: ReportFinalDecisonStatusEnum,
  ) {
    const fetchedReport = await this.reportOrderRepository.findOne(reportId, {
      relations: ['assignedAdmin', 'order', 'order.vendor', 'order.client'],
    });

    if ((fetchedReport.assignedAdmin as Admin).id != adminId)
      throw new UnauthorizedException('يمكن للمشرف المعين فقط تحديث الحالة');
    if (fetchedReport.status != ReportStatusEnum.INREVIEW)
      throw new NotAcceptableException('تعذر تحديث حالة الطلب');
    const fetchedIncome = await this.incomeRepository.findOne(incomeId);
    if (status == ReportFinalDecisonStatusEnum.ACCEPTED) {
      fetchedIncome.status = IncomeStatusEnum.REFUNDED;
    }

    if (status == ReportFinalDecisonStatusEnum.REJECTED) {
      fetchedIncome.status = IncomeStatusEnum.CONFIRMED;
    }
    fetchedReport.status = status;
    const updatedReport = await this.reportOrderRepository.save(fetchedReport);
    if (updatedReport) this.eventEmitter.emit('report.status.updated', {
      report: updatedReport.id,
      target: NotificationTargetEnum.USER,
      type: NotificationTypeEnum.REPORT,
      userIds: [((fetchedReport.order as Order).vendor as Vendor).id,
      ((fetchedReport.order as Order).client as Client).id],
    } as ReportCreatedEvent);
  }
}
