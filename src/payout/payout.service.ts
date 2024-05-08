import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { Payout } from './entities/payout.entity';
import { PayoutStatusEnum } from './enums/payout-status.enum';
import { UpdatePayoutStatusEnum } from './enums/update-status.enum';
import { PayoutRepository } from './repositories/payout.repository';
import { Vendor } from 'src/users/entities/users.entity';
import { PayoutCreatedEvent } from 'src/notification/events/payout-created.event';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PayoutStatusUpdatedEvent } from 'src/notification/events/payout-status-updated.event';

@Injectable()
export class PayoutService {
  constructor(
    private payoutRepository: PayoutRepository,
    private eventEmitter: EventEmitter2,
  ) { }
  async create(vendorId: string, createPayoutDto: CreatePayoutDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const fetchedVendor = await queryRunner.manager.findOne(Vendor, vendorId);
      if (!fetchedVendor) {
        throw new NotFoundException('VENDOR NOT FOUND');
      }

      if (fetchedVendor.account.availableBalance < createPayoutDto.amount)
        throw new NotAcceptableException('رصيد غير كافٍ');

      const payout = new Payout();
      payout.amount = createPayoutDto.amount;
      payout.createdBy = vendorId;
      payout.bankName = fetchedVendor.account.bankName;
      payout.accountNumber = fetchedVendor.account.accountNumber;
      payout.ibanNumber = fetchedVendor.account.ibanNumber;
      if (!payout.bankName || !payout.accountNumber || !payout.ibanNumber)
        throw new NotAcceptableException('املأ التفاصيل المصرفية الخاصة بك');
      fetchedVendor.account.availableBalance -= payout.amount;
      fetchedVendor.account.pendingBalance += payout.amount;
      await queryRunner.manager.save(fetchedVendor);
      const createdPayout = await queryRunner.manager.save(payout);
      await queryRunner.commitTransaction();
      if(createdPayout) this.eventEmitter.emit('payout.created', {
        payout: createdPayout.id,
        type: NotificationTypeEnum.PAYOUT,
        target: NotificationTargetEnum.ADMIN,
      } as PayoutCreatedEvent);

      return createdPayout;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new NotAcceptableException(err);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.payoutRepository.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  findVendorPayouts(vendorId: string) {
    return this.payoutRepository.find({
      where: { createdBy: vendorId },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.payoutRepository.findOne(id, {
      relations: ['createdBy'],
    });
  }

  async updateStatus(id: string, updatePayoutDto: UpdatePayoutDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    const fetchedPayout = await queryRunner.manager.findOne(Payout, {
      relations: ['createdBy'],
      where: { id: id },
    });
    const fetchedVendor = fetchedPayout.createdBy as Vendor;

    await queryRunner.startTransaction();
    try {
      if (!fetchedPayout) throw new NotFoundException('PAYOUT NOT FOUND');
      if (
        fetchedPayout.status == PayoutStatusEnum.APPROVED ||
        fetchedPayout.status == PayoutStatusEnum.REJECTED
      )
        throw new NotAcceptableException('اتخذ القرار بالفعل');
      if (updatePayoutDto.status == UpdatePayoutStatusEnum.REJECTED) {
        if (!updatePayoutDto.rejectMessage)
          throw new BadRequestException('الرجاء إدخال سبب الرفض');
        fetchedVendor.account.availableBalance += fetchedPayout.amount;
        fetchedVendor.account.pendingBalance -= fetchedPayout.amount;
        fetchedPayout.rejectMessage = updatePayoutDto.rejectMessage;
      }
      if (updatePayoutDto.status == UpdatePayoutStatusEnum.APPROVED) {
        fetchedVendor.account.pendingBalance -= fetchedPayout.amount;
      }

      await queryRunner.manager.save(fetchedVendor);

      fetchedPayout.status = updatePayoutDto.status;
      await queryRunner.manager.save(fetchedPayout);

      await queryRunner.commitTransaction();

      this.eventEmitter.emit('payout.status.updated', {
        payout: fetchedPayout.id,
        type: NotificationTypeEnum.PAYOUT,
        status: fetchedPayout.status,
        target: NotificationTargetEnum.USER,
        userIds: [(fetchedPayout.createdBy as Vendor).id]
      } as PayoutStatusUpdatedEvent);

    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new NotAcceptableException(err);
    } finally {
      await queryRunner.release();
    }
  }
}
