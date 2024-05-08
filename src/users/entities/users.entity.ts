import { VendorBanner } from 'src/banner/entities/banner.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Country } from 'src/countries/entities/country.entity';
import { State } from 'src/countries/entities/state.entity';
import { ICountry } from 'src/countries/interfaces/country.interface';
import { File } from 'src/file/entities/file.entity';
import { IFile } from 'src/file/interfaces/i-file.interface';
import { ProductViewHistory } from 'src/history/entities/history.entity';
import { Income } from 'src/income/entities/income.entity';
import { IdeaList } from 'src/lists/entities/IdeaList.entity';
import { Registry } from 'src/lists/entities/Registry.entity';
import { SavedItems } from 'src/lists/entities/SavedItems.entity';
import { WishList } from 'src/lists/entities/WishList.entity';
import { IIdeaList } from 'src/lists/interfaces/IdeaList.interface';
import { IRegistry } from 'src/lists/interfaces/Registry.interface';
import { IWishList } from 'src/lists/interfaces/WishList.interface';
import { UsersNotification } from 'src/notification/entities/notification.entity';
import { PromotinalOffer } from 'src/offer/entities/promotional-offer.entity';
import { Cart } from 'src/order-product/entities/cart.entity';
import { Order } from 'src/order-product/entities/order.entity';
import { OrderStatusEnum } from 'src/order-product/enums/order-staus.enum';
import { IOrder } from 'src/order-product/interfaces/Order.interface';
import {
  AccountGiftCard,
  CreditCard,
  PersonalCheckingAccount,
} from 'src/payment-method/entities/payment-method.entity';
import { ICreditCard } from 'src/payment-method/interfaces/CreditCard.interface';
import { IPersonalCheckingAccount } from 'src/payment-method/interfaces/PersonalCheckingAccount.interface';
import { Payout } from 'src/payout/entities/payout.entity';
import { Message } from 'src/report/entities/message.entity';
import { Report } from 'src/report/entities/report.entity';
import { ProductReview } from 'src/reviews/entities/product-review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  TableInheritance,
  ChildEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessType } from '../enum/business-type.enum';
import { Gender } from '../enum/gender.enum';
import { VendorStateEnum } from '../enum/vendor-state.enum';
import { VerificationLanguage } from '../enum/verification-language.enum';
import { IAdress } from '../interfaces/adress.entity';
import { IQuestion } from '../interfaces/question.interface';
import { IResponse } from '../interfaces/response.interface';
import { IUsers } from '../interfaces/users.interface';
import { Account } from './account.entity';
import { Adress } from './adress.entity';
import { BusinessAdress } from './business-adress-entity';
import { BusinessInfo } from './business-info-entity';
import { PersonnalInfo } from './personnal-info.entity';
import { Question } from './question.entity';
import { Response } from './response.entity';
import { UserNotification } from 'src/notification/entities/user-notification.entity';
import { AdVendor } from 'src/ad/entities/ad.entity';
import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
import { BuyableProduct, SimpleProduct, ParentListing } from 'src/products/entities/product.entity';

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export class Users implements IUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ length: 60 })
  password: string;

  @Column({
    nullable: true,
  })
  otp?: string;

  @Column({
    nullable: true,
  })
  dateBirth?: Date;

  @Column({ default: false })
  isEmailVerfied: boolean;

  @Column({
    nullable: true,
  })
  stripeId: string;

  @OneToMany(() => Chat, (chat) => chat.userSend)
  sender: Chat[] | string[];

  @OneToMany(() => Chat, (chat) => chat.userReceiver)
  receiver: Chat[] | string[];

  @OneToMany(() => File, (file) => file.createdBy)
  files: IFile[] | string[];

  @OneToMany(() => Report, (report) => report.createdBy)
  reports: Report[] | string[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[] | string[];

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => UserNotification, (userNotification) => userNotification.user)
  userNotifications: UserNotification[]

  @OneToMany(() => UsersNotification, (notification) => notification.user)
  notifications: UsersNotification[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity('Client')
export class Client extends Users {
  @OneToMany(() => Question, (question) => question.client)
  questions: IQuestion[] | string[];
  @OneToMany(() => PromotinalOffer, (offer) => offer.client)
  offers: PromotinalOffer[] | string[];

  @OneToMany(() => Adress, (adress) => adress.client)
  adresses: IAdress[] | string[];

  @OneToMany(() => Order, (order) => order.client)
  orders: IOrder[] | string[];

  @OneToMany(() => CreditCard, (creditCard) => creditCard.client)
  creditCards: ICreditCard[] | string[];

  @OneToMany(
    () => PersonalCheckingAccount,
    (personalCheckingAccount) => personalCheckingAccount.client,
  )
  personalCheckingAccounts: IPersonalCheckingAccount[] | string[];

  @OneToMany(() => WishList, (wishList) => wishList.client)
  wishLists: IWishList[];

  @OneToOne(() => Cart)
  cart: Cart;

  @ManyToOne(() => BuyableProduct, (Product) => Product.clients)
  products: BuyableProduct | string;

  @OneToOne(() => AccountGiftCard)
  @JoinColumn()
  accountGiftCard: AccountGiftCard;

  @OneToMany(() => Response, (response) => response.users)
  responses: IResponse[] | string[];

  @OneToOne(() => SavedItems)
  @JoinColumn()
  savedItems: SavedItems;

  @OneToMany(() => ProductReview, (review) => review.client)
  productReviews: ProductReview[] | string[];

  @OneToMany(() => Registry, (registry) => registry.clients)
  registries: IRegistry[];

  @OneToMany(() => IdeaList, (ideaList) => ideaList.client)
  ideaLists: IIdeaList[];

  @OneToMany(
    () => ProductViewHistory,
    (productViewHistory) => productViewHistory.client,
  )
  productViewHistories: ProductViewHistory[] | string[];

  @Column({
    default: 'CUSTOMER',
  })
  role: string = 'CUSTOMER';
}

@ChildEntity('Vendor')
export class Vendor extends Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: VendorStateEnum,
    default: VendorStateEnum.UNVERIFIED,
  })
  vendorState: VendorStateEnum;

  @OneToMany(() => PromotinalOffer, (offer) => offer.vendor)
  offers: PromotinalOffer[] | string[];

  @OneToMany(() => UserSubscription, (userSubscription) => userSubscription.vendor)
  subscriptions: UserSubscription[]

  @OneToMany(
    () => AdVendor,
    (adVendor) => adVendor.vendor,
  )
  ads: AdVendor[] | string[];

  @OneToMany(
    () => VendorBanner,
    (vendorBanner) => vendorBanner.vendor,
  )
  banners: VendorBanner[] | string[];

  @Column({
    default: 'VENDOR',
  })
  role: string = 'VENDOR';

  @Column({ default: false })
  isBusinessInfoFullfilled: boolean;

  @Column({ default: false })
  isSellerInfoFullfilled: boolean;

  @Column({ default: false })
  isPersonalInfoFullfilled: boolean;

  @Column({ default: false })
  isMarketPlaceFullfilled: boolean;

  @Column({ default: false })
  isBillingFullfilled: boolean;

  @Column({ default: false })
  isStoreFullfilled: boolean;

  @Column({ default: false })
  isVerificationFullfilled: boolean;

  @ManyToOne(() => Country, (Country) => Country.vendors)
  businessCountry: ICountry | string;

  @OneToMany(() => Income, (income) => income.vendor)
  incomes: Income[];

  @Column({ type: 'enum', enum: BusinessType })
  businessType: BusinessType;

  @Column(() => BusinessAdress)
  businessAdress: BusinessAdress;

  @Column({ type: 'enum', enum: VerificationLanguage })
  verificationLanguage: VerificationLanguage;

  @Column()
  personalCountry: string;

  @ManyToOne(() => State, (state) => state.vendors)
  businessState: State | string;

  @OneToMany(() => SimpleProduct, (simpleProduct) => simpleProduct.vendor)
  simpleProducts: SimpleProduct[];

  @OneToMany(() => ParentListing, (parentListing) => parentListing.vendor)
  parentListings: ParentListing[];

  @ManyToOne(() => File, (file) => file.identityFrontVendors)
  identityFront: File | string;

  @ManyToOne(() => File, (file) => file.identityBackVendors)
  identityBack: File | string;

  @ManyToOne(() => File, (file) => file.statementVendors)
  statementDocument: File | string;

  @OneToMany(() => Order, (order) => order.vendor)
  orders: IOrder[] | string[];

  @OneToMany(() => Payout, (payout) => payout.createdBy)
  payouts: Payout[] | string[];

  @Column(() => Account)
  account: Account;

  @Column(() => BusinessInfo)
  businessInfo: BusinessInfo;

  @Column(() => PersonnalInfo)
  personnalInfo: PersonnalInfo;
}


@ChildEntity('Transporter')
export class Transporter extends Users {

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToOne(() => File, (file) => file.transporterDocument)
  driveLicence: File;

  @OneToMany(() => File, (file) => file.transporterDocument)
  greyCards: File[];

  @OneToMany(
    () => Order,
    (assignedTransporter) => assignedTransporter.assignedTransporter,
  )
  order: Order | string;

  @Column()
  driveLicenceExpiry: Date;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @Column({
    default: 'TRANSPORTER',
  })
  role: string = 'TRANSPORTER';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

