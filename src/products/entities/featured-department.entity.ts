import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from './department.entity';

@Entity()
export class FeaturedDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
