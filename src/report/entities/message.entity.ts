import { File } from 'src/file/entities/file.entity';
import { Admin } from 'src/users/entities/admin.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Users, (user) => user.messages)
  user: Users | string;

  @ManyToOne(() => Admin, (admin) => admin.messages)
  admin: Admin | string;

  @ManyToOne(() => Report, (report) => report.messages)
  report: Report | string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File | string;

  @OneToOne(() => File)
  @JoinColumn()
  video: File | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
