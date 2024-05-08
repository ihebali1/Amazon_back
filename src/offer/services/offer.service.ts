import { BadRequestException, Injectable } from '@nestjs/common';
import { PromotinalOfferRepository } from '../repositories/promotional-offer.repository';

@Injectable()
export class OfferService {
  constructor(private promotinalOfferRepository: PromotinalOfferRepository) {
  }

  async endOffer(id: string) {
    const fetchedPromotinalOffer = await this.promotinalOfferRepository.findOne(id);
    if (!fetchedPromotinalOffer) throw new BadRequestException('Offer not found');
    fetchedPromotinalOffer.endDate = new Date();
    await this.promotinalOfferRepository.save(fetchedPromotinalOffer);
  }

}
