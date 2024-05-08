import { Module } from '@nestjs/common';
import { BackOfficeDepartmentsModule } from './back-office-departments/back-office-departments.module';
import { BackOfficeParentCategoriesModule } from './back-office-parent-categories/back-office-parent-categories.module';
import { BackOfficeChildCategoriesModule } from './back-office-child-categories/back-office-child-categories.module';
import { BackOfficeAttributesModule } from './back-office-attributes/back-office-attributes.module';
import { BackOfficeVariationThemesModule } from './back-office-variation-themes/back-office-variation-themes.module';
import { BackOfficeFeaturedDepartmentsModule } from './back-office-featured-departments/back-office-featured-departments.module';
import { BackOfficeVendorsModule } from './back-office-vendors/back-office-vendors.module';
import { BackOfficeProductsModule } from './back-office-products/back-office-products.module';
import { BackOfficeSubscriptionsModule } from './back-office-subscriptions/back-office-subscriptions.module';
import { BackOfficeReportsModule } from './back-office-reports/back-office-reports.module';
import { BackOfficePayoutsModule } from './back-office-payouts/back-office-payouts.module';
import { BackOfficeCustomersModule } from './back-office-customers/back-office-customers.module';
import { BackOfficeBrandsModule } from './back-office-brands/back-office-brands.module';
import { BackOfficeOrdersModule } from './back-office-orders/back-office-orders.module';
import { BackOfficeBannersModule } from './back-office-banners/back-office-banners.module';
import { BackOfficePlatformGainModule } from './back-office-platform-gain/back-office-platform-gain.module';
import { BackOfficeUsersModule } from './back-office-users/back-office-users.module';

@Module({
  imports: [
    BackOfficeDepartmentsModule,
    BackOfficeParentCategoriesModule,
    BackOfficeChildCategoriesModule,
    BackOfficeAttributesModule,
    BackOfficeVariationThemesModule,
    BackOfficeFeaturedDepartmentsModule,
    BackOfficeVendorsModule,
    BackOfficeProductsModule,
    BackOfficeSubscriptionsModule,
    BackOfficeReportsModule,
    BackOfficePayoutsModule,
    BackOfficeCustomersModule,
    BackOfficeBrandsModule,
    BackOfficeOrdersModule,
    BackOfficeBannersModule,
    BackOfficePlatformGainModule,
    BackOfficeUsersModule,
  ],
})
export class BackOfficeModule {}
