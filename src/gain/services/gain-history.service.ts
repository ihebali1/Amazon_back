import { Injectable } from '@nestjs/common';
import { GainEnum } from '../enums/gain.enum';
import { GainHistoryRepository } from '../repositories/gain-history.repository';

@Injectable()
export class GainHistoryService {
    constructor(private gainHistoryRepository: GainHistoryRepository) { }

    findAll() {
        return this.gainHistoryRepository.find({
            relations: [
                'payment',
                'payment.orders',
                'payment.userSubscription',
                'payment.userSubscription.subscription',
            ],
        });
    }

    async getPlatformTotalGains() {
        const totalSubscriptionEarnings = await this.gainHistoryRepository.getTotalEarnings(GainEnum.SUBSCRIPTION) as IPlatformGain;
        const totalTranscationEarnings = await this.gainHistoryRepository.getTotalEarnings(GainEnum.TRANSACTION) as IPlatformGain;
        
        if (totalSubscriptionEarnings.total == null) totalSubscriptionEarnings.total = 0;
        else totalSubscriptionEarnings.total = Number(totalSubscriptionEarnings.total);
        if (totalTranscationEarnings.total == null) totalTranscationEarnings.total = 0;
        else totalTranscationEarnings.total = Number(totalTranscationEarnings.total );

        return {
            totalSubscriptionEarnings,
            totalTranscationEarnings
        }
    }

}
export interface IPlatformGain {
    total: number
}
