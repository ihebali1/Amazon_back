import { ReportNotification } from 'src/notification/entities/notification.entity';
import { Order } from 'src/order-product/entities/order.entity';
import { Admin } from 'src/users/entities/admin.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { ReportStatusEnum } from '../enums/report-status.enum';
import { Message } from './message.entity';

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export abstract class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Message, (message) => message.report)
  messages: Message[];

  @Column({
    type: 'enum',
    enum: ReportStatusEnum,
    default: ReportStatusEnum.PENDING,
  })
  status: string;

  @ManyToOne(() => Users, (user) => user.reports)
  createdBy: Users | string;

  @ManyToOne(() => Admin, (admin) => admin.assignedReports)
  assignedAdmin: Admin | string;

  @OneToMany(() => ReportNotification, (reportNotification) => reportNotification.report)
  notifications: ReportNotification[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity('REPORT-ORDER')
export class ReportOrder extends Report {
  @OneToOne(() => Order, (order) => order.report)
  @JoinColumn()
  order: Order | string;
}
