import { SubscriptionEnum } from 'src/subscription/enums/subscription.enum';
import { EntityRepository, Repository } from 'typeorm';
import { UserSubscription } from '../entities/user-subscription.entity';

@EntityRepository(UserSubscription)
export class UserSubscriptionRepository extends Repository<UserSubscription> {
    async findUserActiveProfessionalSubscription(userId: string) {
        return this.createQueryBuilder('userSubscriptions')
            .leftJoinAndSelect('userSubscriptions.subscription', 'subscription')
            .leftJoinAndSelect('userSubscriptions.vendor', 'vendor')
            .where('subscription.kind = :kind', { kind: SubscriptionEnum.PROFESSIONAL })
            .andWhere('vendor.id = :userId', { userId: userId })
            .andWhere('userSubscriptions.isActive = :isActive', {isActive: true})
            .andWhere('userSubscriptions.endDate > :endDate', { endDate: new Date() })
            .getOne();
    }

    async findUserActiveIndividualSubscription(userId: string) {
        return this.createQueryBuilder('userSubscriptions')
            .leftJoinAndSelect('userSubscriptions.subscription', 'subscription')
            .leftJoinAndSelect('userSubscriptions.vendor', 'vendor')
            .where('subscription.kind = :kind', { kind: SubscriptionEnum.INDIVIDUAL })
            .andWhere('vendor.id = :userId', { userId: userId })
            .andWhere('userSubscriptions.isActive = :isActive', {isActive: true})
            .getOne();
    }

}
