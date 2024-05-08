import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Order } from 'src/order-product/entities/order.entity';
import { ReportOrder } from 'src/report/entities/report.entity';
import { ReportStatusEnum } from 'src/report/enums/report-status.enum';
import { CreateIncomeDto } from '../dto/create-income.dto';
import { UpdateIncomeDto } from '../dto/update-income.dto';
import { IncomeStatusEnum } from '../enums/income-status.enum';
import { IncomeRepository } from '../repositories/income.repository';
import { getConnection } from 'typeorm';
import { Income } from '../entities/income.entity';
import { Vendor } from 'src/users/entities/users.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncomeStatusUpdatedEvent } from 'src/notification/events/income-status-updated.event';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { DateTime } from 'luxon';

@Injectable()
export class IncomeService {
  constructor(private incomeRepository: IncomeRepository, private eventEmitter: EventEmitter2) { }
  create(createIncomeDto: CreateIncomeDto) {
    return 'This action adds a new income';
  }

  findAllByVendor(vendorId: string) {
    return this.incomeRepository.find({
      relations: ['order'],
      where: { vendor: vendorId },
    });
  }

  findAll() {
    return `This action returns all income`;
  }

  findOne(id: string) {
    return this.incomeRepository.find({
      relations: [
        'order',
        'vendor',
        'order.orderItems',
        'order.orderItems.product',
        'order.client',
      ],
      where: { id: id },
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async ValidateIncomes() {

    const updatedIncomes: Income[] = []
    // create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect()

    // lets now open a new transaction:
    await queryRunner.startTransaction()

    try {
      // execute some operations on this transaction:
      const date = new Date();
      const yesterday = new Date(date.setDate(date.getDate() - 1));
      const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const incomes = await this.incomeRepository.findIncomesFullDetails(lastMonth, new Date(), IncomeStatusEnum.PENDING);
      for (const income of incomes) {
        const fetchedVendor = income.vendor as Vendor;
        if ((income.order as Order).report == null) {
          income.status = IncomeStatusEnum.CONFIRMED;
          updatedIncomes.push(await queryRunner.manager.save(Income, income));
          //@TODO Add lock to vendor account
          fetchedVendor.account.availableBalance += income.amount;
          await queryRunner.manager.save(Vendor, fetchedVendor);

        }
        if ((income.order as Order).report) {
          if (((income.order as Order).report as ReportOrder).status == ReportStatusEnum.ACCEPTED) {
            income.status = IncomeStatusEnum.REFUNDED;

            updatedIncomes.push(await queryRunner.manager.save(Income, income));
          }
          if (((income.order as Order).report as ReportOrder).status == ReportStatusEnum.REJECTED) {
            income.status = IncomeStatusEnum.CONFIRMED;

            fetchedVendor.account.availableBalance += income.amount;
            await queryRunner.manager.save(Vendor, fetchedVendor);
            updatedIncomes.push(await queryRunner.manager.save(Income, income));
          }
        }
      }
      // commit transaction now:
      await queryRunner.commitTransaction()

      for (const income of updatedIncomes) {
        this.eventEmitter.emit('income.status.updated', {
          target: NotificationTargetEnum.USER,
          income: income.id,
          status: income.status,
          incomeAmount: income.amount,
          type: NotificationTypeEnum.INCOME,
          userIds: [((income as Income).vendor as Vendor).id],
        } as IncomeStatusUpdatedEvent);
      }
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }

  createDateArray(length: number) {
    const dates: number[] = [];

    for (let i = 0; i < length; i++) {
      dates.push(+DateTime.local().minus({ day: i }).toJSDate());
    }

    return dates.reverse();
  }

  async getIncomeStatisticsByDate(vendorId: string, dateCount: number = 7) {
    try {
      const incomes = []
      const dates = this.createDateArray(dateCount);
      for (const date of dates) {
        const from = new Date(date);
        from.setHours(0, 0, 0, 0);
        const to = new Date(date);
        to.setHours(23, 59, 59, 999);
        const income = await this.incomeRepository.findIncomeByDateInterval(vendorId, new Date(from), new Date(to), IncomeStatusEnum.CONFIRMED);
        if (income.totalAmount == null) incomes.push(0);
        else incomes.push(Number(income.totalAmount))
      }
      return {
        dates,
        incomes
      }
    } catch (error) {
      console.log(error);
    }

  }
}
