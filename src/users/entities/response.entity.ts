import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IQuestion } from '../interfaces/question.interface';
import { IResponse } from '../interfaces/response.interface';
import { IUsers } from '../interfaces/users.interface';
import { Question } from './question.entity';
import { Client, Users } from './users.entity';

@Entity()
export class Response implements IResponse {
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => Question, (Question) => Question.responses)
  question: IQuestion | string;

  @ManyToOne(() => Client, (Client) => Client.responses)
  users: IUsers | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
