import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './products/products.module';
import { BackOfficeModule } from './back-office/back-office.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';
import { RegisterModule } from './register/register.module';
import { OrderProductModule } from './order-product/order-product.module';
import { CountriesModule } from './countries/countries.module';
import { ListsModule } from './lists/lists.module';
import { PaymentPlatformModule } from './payment-platform/payment-platform.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { GainModule } from './gain/gain.module';
import { HistoryModule } from './history/history.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentModule } from './payment/payment.module';
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';
import { IncomeModule } from './income/income.module';
import { OfferModule } from './offer/offer.module';
import { ManagementPackModule } from './management-pack/management-pack.module';
import { PermissionModule } from './permission/permission.module';
import { TransporterModule } from './transporter/transporter.module';
import { VatModule } from './vat/vat.module';
import { ShippingCostModule } from './shipping-cost/shipping-cost.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PayoutModule } from './payout/payout.module';

import { ChatModule } from './chat/chat.module';
import { VerifyModule } from './verify/verify.module';
import { BannerModule } from './banner/banner.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AdModule } from './ad/ad.module';
import { UserSubscriptionModule } from './user-subscription/user-subscription.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(),
    LoginModule,
    RegisterModule,
    UsersModule,
    ForgotPasswordModule,
    ChangePasswordModule,
    ScheduleModule.forRoot(),
    FileModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT),
          secureConnection: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        tls: {
          ciphers: 'SSLv3',
          //rejectUnauthorized: false,
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),
    }),
    ProductsModule,
    OrderProductModule,
    UsersModule,
    PaymentMethodModule,
    PaymentModule,
    ListsModule,
    BackOfficeModule,
    CountriesModule,
    SharedModule,
    GainModule,
    PaymentPlatformModule,
    SubscriptionModule,
    HistoryModule,
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2020-08-27' }),
    ReportModule,
    NotificationModule,
    IncomeModule,
    OfferModule,
    ManagementPackModule,
    PermissionModule,
    TransporterModule,
    VatModule,
    ShippingCostModule,
    ReviewsModule,
    ChatModule,
    PayoutModule,
    VerifyModule,
    BannerModule,
    AdModule,
    UserSubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
