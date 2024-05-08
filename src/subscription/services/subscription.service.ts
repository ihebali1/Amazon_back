import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { SubscriptionRepository } from '../repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  findAll() {
    return this.subscriptionRepository.find();
  }

  public async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<any> {
    const fetchedSubscription = await this.subscriptionRepository.findOne(id);
    if (!fetchedSubscription)
      throw new NotFoundException('SUBSCRIPTION NOT FOUND');
    if (updateSubscriptionDto.description)
      fetchedSubscription.description = updateSubscriptionDto.description;
    if (updateSubscriptionDto.price)
      fetchedSubscription.price = updateSubscriptionDto.price;
    return this.subscriptionRepository.save(fetchedSubscription);
  }
}
