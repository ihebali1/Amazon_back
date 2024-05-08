import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from 'src/file/repositories/file.repository';
import { DealProductRepository } from 'src/offer/repositories/deal-product.repository';
import { ProductReview } from 'src/reviews/entities/product-review.entity';
import { Vendor } from 'src/users/entities/users.entity';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { ChildCategoriesController } from './controllers/child-categories.controller';
import { DepartmentsController } from './controllers/departments.controller';
import { ParentCategoriesController } from './controllers/parent-categories.controller';
import { ProductsController } from './controllers/products.controller';
import { AttributeChoice } from './entities/attribute-choice.entity';
import { AttributeValue } from './entities/attribute-value.entity';
import { Attribute } from './entities/attribute.entity';
import { ChildCategory } from './entities/child-category.entity';
import { Department } from './entities/department.entity';
import { FeaturedDepartment } from './entities/featured-department.entity';
import { ParentCategory } from './entities/parent-category.entity';
import { ProductFeature } from './entities/product-feature.entity';
import { ProductKeyWord } from './entities/product-key-word.entity';
import { ProductWarning } from './entities/product-warning.entity';
import { VariationTheme } from './entities/variation-theme.entity';
import { AttributeChoiceRepository } from './repositories/attribute-choice.repository';
import { AttributeValueRepository } from './repositories/attribute-value.repository';
import { AttributeRepository } from './repositories/attribute.repository';
import { BrandRepository } from './repositories/brand.repository';
import { ChildCategoryRepository } from './repositories/child-category.repository';
import { DepartmentRepository } from './repositories/department.repository';
import { FeaturedDepartmentRepository } from './repositories/featured-department.repository';
import { ParentCategoryRepository } from './repositories/parent-category.repository';
import { ParentListingRepository } from './repositories/parent-listing.repository';
import { ProductFeatureRepository } from './repositories/product-feature.repository';
import { ProductKeyWordRepository } from './repositories/product-key-word.repository';
import { ProductWarningRepository } from './repositories/product-warning.repository';
import { BuyableProductRepository } from './repositories/buyable-product.repository';
import { SimpleProductRepository } from './repositories/simple-product.repository';
import { SpecificationRepository } from './repositories/specification.repository';
import { VariationThemeRepository } from './repositories/variation-theme.repository';
import { VariationRepository } from './repositories/variation.repository';
import { AttributesService } from './services/attributes.service';
import { BrandService } from './services/brand.service';
import { ChildCategoriesService } from './services/child-categories.service';
import { DepartmentsService } from './services/departments.service';
import { ParentCategoriesService } from './services/parent-categories.service';
import { ProductsService } from './services/products.service';
import { VariationThemesService } from './services/variation-themes.service';
import { BrandsController } from './controllers/brands.controller';
import { BuyableProduct, Variation, ParentListing } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyableProduct,
      BuyableProductRepository,
      DepartmentRepository,
      Department,
      ParentCategory,
      ParentCategoryRepository,
      ChildCategoryRepository,
      ChildCategory,
      Attribute,
      AttributeRepository,
      VariationTheme,
      VariationThemeRepository,
      AttributeChoice,
      AttributeChoiceRepository,
      Variation,
      VariationRepository,
      AttributeValue,
      AttributeValueRepository,
      ParentListingRepository,
      ParentListing,
      SimpleProductRepository,
      ProductFeature,
      ProductFeatureRepository,
      ProductKeyWord,
      ProductWarning,
      ProductKeyWordRepository,
      ProductWarningRepository,
      Vendor,
      ProductReview,
      VendorRepository,
      FileRepository,
      FeaturedDepartment,
      FeaturedDepartmentRepository,
      DealProductRepository,
      SpecificationRepository,
      BrandRepository,
    ]),
  ],
  controllers: [
    ProductsController,
    DepartmentsController,
    ChildCategoriesController,
    ParentCategoriesController,
    BrandsController
  ],
  providers: [
    ProductsService,
    DepartmentsService,
    ParentCategoriesService,
    ChildCategoriesService,
    AttributesService,
    VariationThemesService,
    BrandService,
  ],
  exports: [
    ProductsService,
    DepartmentsService,
    ParentCategoriesService,
    ChildCategoriesService,
    AttributesService,
    VariationThemesService,
    BrandService,
  ],
})
export class ProductsModule {}
