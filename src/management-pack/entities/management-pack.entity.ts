import { Permission } from 'src/permission/entities/permission.entity';
import { Admin } from 'src/users/entities/admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ManagementPack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Permission, (permission) => permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Admin, (admin) => admin.managementPack)
  admins: Admin[];
}
