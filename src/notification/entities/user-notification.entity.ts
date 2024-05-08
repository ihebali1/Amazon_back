import { Users } from 'src/users/entities/users.entity';
import {
    Column,
    Entity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
export class UserNotification {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, (user) => user.notifications)
    user: Users | string;

    @ManyToOne(
        () => Notification,
        (notitification) => notitification.userNotifications,
    )
    notification: Notification | string;

    @Column({ default: false })
    isSeen: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
