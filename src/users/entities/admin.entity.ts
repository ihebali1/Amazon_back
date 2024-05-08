import { ManagementPack } from 'src/management-pack/entities/management-pack.entity';
import { Message } from 'src/report/entities/message.entity';
import { Report } from 'src/report/entities/report.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AdminRoleEnum } from '../enum/admin-role.enum';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    default: true,
  })
  active: boolean;

  @OneToMany(() => Report, (report) => report.assignedAdmin)
  assignedReports: Report[] | string[];

  @OneToMany(() => Message, (message) => message.admin)
  messages: Message[] | string[];

  @Column({
    type: 'enum',
    enum: AdminRoleEnum,
    default: AdminRoleEnum.ADMIN,
  })
  role: AdminRoleEnum;

  @ManyToOne(() => ManagementPack, (managementPack) => managementPack.admins)
  managementPack: ManagementPack | string;
}
