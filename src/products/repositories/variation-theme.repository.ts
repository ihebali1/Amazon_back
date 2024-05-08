import { EntityRepository, Repository } from 'typeorm';
import { VariationTheme } from '../entities/variation-theme.entity';

@EntityRepository(VariationTheme)
export class VariationThemeRepository extends Repository<VariationTheme> {
  async getVariationThemesByChildCategory(categoryId: string) {
    return this.createQueryBuilder('variationTheme')
      .leftJoin('variationTheme.childCategory', 'childCategory')
      .where('childCategory.id = :categoryId', { categoryId })
      .getMany();
  }
}
