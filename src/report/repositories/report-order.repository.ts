import { EntityRepository, Repository } from 'typeorm';
import { ReportOrder } from '../entities/report.entity';

@EntityRepository(ReportOrder)
export class ReportOrderRepository extends Repository<ReportOrder> {}
