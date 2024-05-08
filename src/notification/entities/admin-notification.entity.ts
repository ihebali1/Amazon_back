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
export class AdminNotification {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => Notification,
        (notitification) => notitification.adminNotifications,
        { primary: true },
    )
    notification: Notification | string;

    @Column({ default: false })
    isSeen: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
