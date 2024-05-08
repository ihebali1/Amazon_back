import { OrderStatusEnum } from 'src/order-product/enums/order-staus.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Income } from '../entities/income.entity';
import { IncomeStatusEnum } from '../enums/income-status.enum';

@EntityRepository(Income)
export class IncomeRepository extends Repository<Income> {

    async findIncomesFullDetails(from: Date, to: Date, status: IncomeStatusEnum) {
        return this.createQueryBuilder('incomes')
            .leftJoinAndSelect('incomes.order', 'order')
            .leftJoinAndSelect('order.report', 'report')
            .leftJoinAndSelect('incomes.vendor', 'vendor')
            .where('incomes.createdAt >= :from', { from: from })
            .andWhere('incomes.createdAt <= :to', { to: to })
            .andWhere('incomes.status = :status', { status: status })
            .andWhere('order.status = :orderStatus',
                { orderStatus: OrderStatusEnum.DELIVERED })
            .getMany();
    }

    async findIncomeByDateInterval(vendorId: string, from: Date, to: Date, status: IncomeStatusEnum) {
        return this.createQueryBuilder('incomes')
            .leftJoin('incomes.order', 'order')
            .leftJoin('order.report', 'report')
            .leftJoin('incomes.vendor', 'vendor')
            .select('SUM(incomes.amount) AS totalAmount')
            .where('incomes.createdAt >= :from', { from: from })
            .andWhere('vendor.id = :vendorId', { vendorId: vendorId })
            .andWhere('incomes.createdAt <= :to', { to: to })
            .andWhere('incomes.status = :status', { status: status })
            .getRawOne();
    }
}
