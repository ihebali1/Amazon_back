import { BuyableProduct } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IQuestion } from '../interfaces/question.interface';
import { IResponse } from '../interfaces/response.interface';
import { IUsers } from '../interfaces/users.interface';
import { Response } from './response.entity';
import { Client } from './users.entity';

@Entity()
export class Question implements IQuestion {
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: Date;

  @OneToMany(() => Response, (response) => response.question)
  responses: IResponse[] | string[];

  @ManyToOne(() => BuyableProduct, (Product) => Product.questions)
  product: BuyableProduct | string;

  @ManyToOne(() => Client, (Client) => Client.questions)
  client: IUsers | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
