import { EntityRepository, Repository } from 'typeorm';
import { ProductBanner } from '../entities/banner.entity';

@EntityRepository(ProductBanner)
export class ProductBannerRepository extends Repository<ProductBanner> {}
