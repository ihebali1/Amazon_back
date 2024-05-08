import { Payment } from "src/payment/entities/payment.entity";
import { Subscription } from "src/subscription/entities/subscription.entity";
import { Vendor } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserSubscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Vendor, (vendor) => vendor.subscriptions)
    vendor: Vendor | string;
                                            
    @ManyToOne(() => Subscription, (subscription) => subscription.userSubscriptions)
    subscription: Subscription | string;

    @OneToOne(() => Payment)
    @JoinColumn()
    paymentInfo: Payment | string;

    @Column()
    startDate: Date;      

    @Column({
        nullable: true,
    })
    endDate: Date;      
    
    @Column({
        default: true,
    })
    isActive: boolean;      

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
