import { EntityRepository, Repository } from 'typeorm';
import { VendorBanner } from '../entities/banner.entity';

@EntityRepository(VendorBanner)
export class VendorBannerRepository extends Repository<VendorBanner> {}
