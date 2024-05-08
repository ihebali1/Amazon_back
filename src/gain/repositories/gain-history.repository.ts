import { EntityRepository, Repository } from 'typeorm';
import { GainHistory } from '../entities/gain-history.entity';
import { GainEnum } from '../enums/gain.enum';

@EntityRepository(GainHistory)
export class GainHistoryRepository extends Repository<GainHistory> {

    async getTotalEarnings(type: GainEnum) {
        return this.createQueryBuilder('gains')
            .select('SUM(gains.amount) AS total')
            .where('gains.type = :type', { type })
            .getRawOne();
    }
}
