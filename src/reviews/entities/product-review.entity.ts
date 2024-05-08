import { ReviewNotification } from 'src/notification/entities/notification.entity';
import { Client } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, (Client) => Client.productReviews)
  client: Client | string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product | string;

  @OneToMany(() => ReviewNotification, (reviewNotification) => reviewNotification.productReview)
  notifications: ReviewNotification[];
}
