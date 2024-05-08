import { File } from 'src/file/entities/file.entity';
import { ChatNotification } from 'src/notification/entities/notification.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Entity,
  TableInheritance,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Users, (user) => user.sender)
  userSend: Users | string;

  @ManyToOne(() => Users, (user) => user.receiver)
  userReceiver: Users | string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File | string;

  @OneToOne(() => File)
  @JoinColumn()
  video: File | string;

  @OneToMany(() => ChatNotification, (notification) => notification.chat)
  notifications: ChatNotification[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
