/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { FileRepository } from 'src/file/repositories/file.repository';
import { DealProductRepository } from 'src/offer/repositories/deal-product.repository';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { AddFeatureFromProductDto } from '../dto/add-feature-from-product.dto';
import { AddImageToProductImageDto } from '../dto/add-image-to-product-image.dto';
import { AddKeywordFromProductDto } from '../dto/add-keyword-from-product.dto';
import { AddSpecificationToProductDto } from '../dto/add-specification-to-product.dto';
import { AddWarningFromProductDto } from '../dto/add-warning-from-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindByTypeDto } from '../dto/find-by-type.dto';
import { FindProductsDto } from '../dto/find-products-dto';
import { FindVendorProductsDto } from '../dto/find-vendor-products.dto';
import { RemoveImageFromProductDto } from '../dto/remove-image-from-product.dto';
import { UpdatePrimaryImageDto } from '../dto/update-primary-image.dto';
import { UpdateProductDescriptionDto } from '../dto/update-product-description.dto';
import { UpdateProductKeywordsDto } from '../dto/update-product-keywords.dto';
import { UpdateProductOfferDto } from '../dto/update-product-offer.dto';
import { UpdateProductStatusDto } from '../dto/update-product-status.dto';
import { UpdateProductVitalInfoDto } from '../dto/update-product-vital-info.dto';
import { UpdateVariationDto } from '../dto/update-variation.dto';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Brand } from '../entities/brand.entity';
import { ProductFeature } from '../entities/product-feature.entity';
import { ProductKeyWord } from '../entities/product-key-word.entity';
import { ProductWarning } from '../entities/product-warning.entity';
import { Specification } from '../entities/specification.entity';
import { ProductStatusEnum } from '../enums/product-status.enum';
import { ProductTypeEnum } from '../enums/product-type.enum';

import { DepartmentRepository } from '../repositories/department.repository';
import { ParentListingRepository } from '../repositories/parent-listing.repository';
import { ProductFeatureRepository } from '../repositories/product-feature.repository';
import { ProductKeyWordRepository } from '../repositories/product-key-word.repository';
import { ProductWarningRepository } from '../repositories/product-warning.repository';

import { SimpleProductRepository } from '../repositories/simple-product.repository';
import { SpecificationRepository } from '../repositories/specification.repository';
import { VariationRepository } from '../repositories/variation.repository';
import { getConnection } from 'typeorm';
import { AttributeChoice } from '../entities/attribute-choice.entity';
import { File } from 'src/file/entities/file.entity';
import { UpdateProductActivationDto } from '../dto/update-product-activation.dto';
import { ProductCreatedEvent } from 'src/notification/events/product-created.event';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { Vendor } from 'src/users/entities/users.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ParentListing, BuyableProduct, Variation, SimpleProduct } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private variationRepository: VariationRepository,
    private parentListingRepository: ParentListingRepository,
    private simpleProductRepository: SimpleProductRepository,
    private productKeyWordRepository: ProductKeyWordRepository,
    private productwarningRepository: ProductWarningRepository,
    private productFeatureRepository: ProductFeatureRepository,
    private vendorRepository: VendorRepository,
    private fileRepository: FileRepository,
    private departmentRepository: DepartmentRepository,
    private dealProductRepository: DealProductRepository,
    private specificationRepository: SpecificationRepository,
    private eventEmitter: EventEmitter2
  ) { }
  async create(createProductDto: CreateProductDto, vendorId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      if (createProductDto.isWithVariations == true) {
        const parentListing = new ParentListing();
        parentListing.variationTheme = createProductDto.variationTheme;
        parentListing.childCategory = createProductDto.childCategory;
        parentListing.name = createProductDto.name;
        parentListing.arName = createProductDto.arName;
        parentListing.arName = createProductDto.arName;
        parentListing.name = createProductDto.name;
        if (createProductDto.brand)
          parentListing.brand = createProductDto.brand;
        parentListing.manufacturer = createProductDto.manufacturer;
        parentListing.manufactureSerial = createProductDto.manufactureSerial;
        parentListing.description = createProductDto.description;
        parentListing.searchTerms = createProductDto.searchTerms;
        parentListing.legalDisclaimer = createProductDto.legalDisclaimer;
        parentListing.vendor = vendorId;

        const createdParentListing = await queryRunner.manager.findOne(
          ParentListing,
          await (
            await queryRunner.manager.save(ParentListing, parentListing)
          ).id,
          {
            relations: [
              'variations',
              'specifications',
              'variations.variationAttributeChoices',
              'variations.variationAttributeValues',
              'images',
              'primaryImage',
              'keyWords',
              'warnings',
              'attributeChoices',
              'attributeValues',
              'customBrand',
              'vendor'
            ],
          },
        );

        for (const feature of createProductDto.features) {
          const createdFeature = new ProductFeature();
          createdFeature.value = feature;
          createdFeature.parentListing = createdParentListing;
          await queryRunner.manager.save(ProductFeature, createdFeature);
        }

        for (const keyWord of createProductDto.keyWords) {
          const createdKeyWord = new ProductKeyWord();
          createdKeyWord.value = keyWord;
          createdKeyWord.parentListing = createdParentListing;
          await queryRunner.manager.save(ProductKeyWord, createdKeyWord);
        }

        for (const warning of createProductDto.warnings) {
          const createdWarning = new ProductWarning();
          createdWarning.value = warning;
          createdWarning.parentListing = createdParentListing;
          await queryRunner.manager.save(ProductWarning, createdWarning);
        }

        for (const variation of createProductDto.variations) {
          const productVariation = new BuyableProduct() as Variation;

          productVariation.price = variation.variationPrice;
          productVariation.quantity = variation.variationQuantity;
          productVariation.condition = variation.variationCondition;
          productVariation.productId = variation.productId;
          productVariation.productIdType = variation.productIdType;

          const createdProductVariation = await queryRunner.manager.findOne(
            Variation,
            (
              await queryRunner.manager.save(Variation, productVariation)
            ).id,
            {
              relations: [
                'variationAttributeChoices',
                'variationAttributeValues',
              ],
            },
          );
          createdParentListing.variations.push(createdProductVariation);

          if (variation.attributeValues) {
            for (const attValue of variation.attributeValues) {
              const attributeValue = new AttributeValue();
              attributeValue.attribute = attValue.attribute;
              attributeValue.value = attValue.value;
              const createdAttributeValue = await queryRunner.manager.save(
                AttributeValue,
                attributeValue,
              );
              createdProductVariation.variationAttributeValues.push(
                createdAttributeValue,
              );
              await queryRunner.manager.save(
                Variation,
                createdProductVariation,
              );
            }
          }

          if (variation.attributeChoices) {
            for (const attChoice of variation.attributeChoices) {
              const fetchedAttributeChoice = await queryRunner.manager.findOne(
                AttributeChoice,
                attChoice,
              );
              createdProductVariation.variationAttributeChoices.push(
                fetchedAttributeChoice,
              );
              await queryRunner.manager.save(
                Variation,
                createdProductVariation,
              );
            }
          }
        }
        const fetchedImage = await queryRunner.manager.findOne(
          File,
          createProductDto.primaryImage,
        );
        createdParentListing.primaryImage = fetchedImage;
        for (const image of createProductDto.images) {
          const fetchedImage = await queryRunner.manager.findOne(File, image);
          createdParentListing.images.push(fetchedImage);
        }

        for (const attValue of createProductDto.attributeValues) {
          const attributeValue = new AttributeValue();
          attributeValue.attribute = attValue.attribute;
          attributeValue.value = attValue.value;
          const createdAttributeValue = await queryRunner.manager.save(
            AttributeValue,
            attributeValue,
          );
          createdParentListing.attributeValues.push(createdAttributeValue);
        }

        for (const attChoice of createProductDto.attributeChoices) {
          const fetchedAttributeChoice = await queryRunner.manager.findOne(
            AttributeChoice,
            attChoice,
          );
          createdParentListing.attributeChoices.push(fetchedAttributeChoice);
        }
        for (const specification of createProductDto.specifications) {
          const createdSpecification = await queryRunner.manager.save(
            Specification,
            specification,
          );
          createdParentListing.specifications.push(createdSpecification);
        }
        if (createProductDto.customBrand)
          createdParentListing.customBrand = createProductDto.customBrand;

        await queryRunner.manager.save(ParentListing, createdParentListing);

        await queryRunner.commitTransaction();
        this.eventEmitter.emit('product.created', {
          product: createdParentListing.id,
          type: NotificationTypeEnum.PRODUCT,
          target: NotificationTargetEnum.USER,
          userIds: [(createdParentListing.vendor as Vendor).id],
        } as ProductCreatedEvent);

        this.eventEmitter.emit('product.created', {
          product: createdParentListing.id,
          type: NotificationTypeEnum.PRODUCT,
          target: NotificationTargetEnum.ADMIN,
        } as ProductCreatedEvent);

      } else {
        const product = new BuyableProduct() as SimpleProduct;
        product.productId = createProductDto.productId;
        product.productIdType = createProductDto.productIdType;
        product.arName = createProductDto.arName;
        product.name = createProductDto.name;
        if (createProductDto.brand) product.brand = createProductDto.brand;
        product.quantity = createProductDto.quantity;
        product.price = createProductDto.price;
        product.condition = createProductDto.condition;
        product.manufacturer = createProductDto.manufacturer;
        product.manufactureSerial = createProductDto.manufactureSerial;
        product.childCategory = createProductDto.childCategory;
        product.description = createProductDto.description;
        //product.features = createProductDto.features;
        product.searchTerms = createProductDto.searchTerms;
        product.legalDisclaimer = createProductDto.legalDisclaimer;
        //product.vendor = vendorId;
        const createdProduct = await queryRunner.manager.findOne(
          SimpleProduct,
          (
            await queryRunner.manager.save(SimpleProduct, product)
          ).id,
          {
            relations: [
              'primaryImage',
              'images',
              'attributeValues',
              'attributeChoices',
              'vendor',
              'specifications',
              'customBrand',
            ],
          },
        );

        for (const feature of createProductDto.features) {
          const createdFeature = new ProductFeature();
          createdFeature.value = feature;
          createdFeature.simpleProduct = createdProduct;
          await queryRunner.manager.save(ProductFeature, createdFeature);
        }

        for (const keyWord of createProductDto.keyWords) {
          const createdKeyWord = new ProductKeyWord();
          createdKeyWord.value = keyWord;
          createdKeyWord.simpleProduct = createdProduct;
          await queryRunner.manager.save(ProductKeyWord, createdKeyWord);
        }

        for (const warning of createProductDto.warnings) {
          const createdWarning = new ProductWarning();
          createdWarning.value = warning;
          createdWarning.simpleProduct = createdProduct;
          await queryRunner.manager.save(ProductWarning, createdWarning);
        }
        const fetchedImage = await queryRunner.manager.findOne(
          File,
          createProductDto.primaryImage,
        );
        createdProduct.primaryImage = fetchedImage;
        for (const image of createProductDto.images) {
          const fetchedImage = await queryRunner.manager.findOne(File, image);
          createdProduct.images.push(fetchedImage);
        }

        for (const attValue of createProductDto.attributeValues) {
          const attributeValue = new AttributeValue();
          attributeValue.attribute = attValue.attribute;
          attributeValue.value = attValue.value;
          const createdAttributeValue = await queryRunner.manager.save(
            AttributeValue,
            attributeValue,
          );
          createdProduct.attributeValues.push(createdAttributeValue);
        }

        for (const attChoice of createProductDto.attributeChoices) {
          // createdProduct.attributeChoices.push(attChoice);
          const fetchedAttributeChoice = await queryRunner.manager.findOne(
            AttributeChoice,
            attChoice,
          );
          createdProduct.attributeChoices.push(fetchedAttributeChoice);
        }
        for (const specification of createProductDto.specifications) {
          const createdSpecification = await queryRunner.manager.save(
            Specification,
            specification,
          );
          createdProduct.specifications.push(createdSpecification);
        }
        createdProduct.vendor = vendorId;
        if (createProductDto.customBrand)
          createdProduct.customBrand = createProductDto.customBrand;
        await queryRunner.manager.save(SimpleProduct, createdProduct);

        await queryRunner.commitTransaction();

        this.eventEmitter.emit('product.created', {
          product: createdProduct.id,
          type: NotificationTypeEnum.PRODUCT,
          target: NotificationTargetEnum.USER,
          userIds: [((createdProduct as BuyableProduct).vendor as Vendor).id],
        } as ProductCreatedEvent);

        this.eventEmitter.emit('product.created', {
          product: createdProduct.id,
          type: NotificationTypeEnum.PRODUCT,
          target: NotificationTargetEnum.ADMIN,
        } as ProductCreatedEvent);
      }

    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    //@TODO(check attributes within variationTheme)
  }

  async findAll(findProductsFilter: FindProductsDto) {
    //@TODO() Fix product relation
    const products = [];
    const totalProductCount =
      (await this.simpleProductRepository.count({
        status: ProductStatusEnum.APPROVED,
        isActive: true,
      })) +
      (await this.parentListingRepository.count({
        status: ProductStatusEnum.APPROVED,
        isActive: true,
      }));

    const [simpleProducts, simpleProductCount] =
      await this.simpleProductRepository.findProducts(findProductsFilter);
    for (const simpleProduct of simpleProducts) {
      products.push(simpleProduct);
    }

    const [parentListings, parentListingCount] =
      await this.parentListingRepository.findProducts(findProductsFilter);
    for (const parentListing of parentListings) {
      products.push(parentListing);
    }
    return {
      products,
      total: simpleProductCount + parentListingCount,
      totalCount: totalProductCount,
    };
  }

  async findVendorProducts(
    vendorId: string,
    findVendorProductsFilter: FindVendorProductsDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) {
      throw new NotFoundException('vendor not fount');
    }
    console.log(vendor);
    const products = [];
    const simpleProducts =
      await this.simpleProductRepository.findVendorProducts(
        findVendorProductsFilter,
        vendorId,
      );
    console.log(simpleProducts);
    for (const simpleProduct of simpleProducts) {
      products.push(simpleProduct);
    }

    const parentListings =
      await this.parentListingRepository.findVendorProducts(
        findVendorProductsFilter,
        vendorId,
      );
    for (const parentListing of parentListings) {
      products.push(parentListing);
    }
    console.log(parentListings);
    return products;
  }

  async findActiveProductsByDepartment(departmentId: string) {
    const department = await this.departmentRepository.findOne(departmentId);
    if (!department) {
      throw new NotFoundException('department not found');
    }
    const products = [];
    const simpleProducts =
      await this.simpleProductRepository.findProductsByDepartment(
        departmentId,
        ProductStatusEnum.APPROVED,
      );
    console.log(simpleProducts);
    for (const simpleProduct of simpleProducts) {
      products.push(simpleProduct);
    }

    const parentListings =
      await this.parentListingRepository.findProductsByDepartment(
        departmentId,
        ProductStatusEnum.APPROVED,
      );
    for (const parentListing of parentListings) {
      products.push(parentListing);
    }
    return products;
  }

  async findVendorApprovedProducts(vendorId: string) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) {
      throw new NotFoundException('vendor not found');
    }
    console.log(vendor);
    const products = [];
    const simpleProducts = await this.simpleProductRepository.find({
      relations: ['childCategory', 'primaryImage', 'images'],
      where: { vendor: vendor, status: ProductStatusEnum.APPROVED, isActive: true },
    });
    console.log(simpleProducts);
    for (const simpleProduct of simpleProducts) {
      products.push(simpleProduct);
    }

    const parentListings = await this.parentListingRepository.find({
      relations: [
        'childCategory',
        'vendor',
        'variations',
        'primaryImage',
        'images',
      ],
      where: { vendor: vendor, status: ProductStatusEnum.APPROVED, isActive: true },
    });
    for (const parentListing of parentListings) {
      products.push(parentListing);
    }
    console.log(parentListings);
    return products;
  }

  findSimpleProducts() {
    return this.simpleProductRepository.find({
      relations: ['childCategory', 'vendor'],
    });
  }

  async findHotNewArrivalActiveProducts(findProductsFilter: FindProductsDto) {
    const parentListings = await this.parentListingRepository.findHotNewArrival(
      findProductsFilter,
    );
    const simpleProducts = await this.simpleProductRepository.findHotNewArrival(
      findProductsFilter,
    );
    return [].concat(parentListings, simpleProducts);
  }

  async getSameBrandProducts(productId: string, type: ProductTypeEnum) {
    const fetchedProduct = await this.findOne(productId, { type });
    if (!fetchedProduct) return [];
    if (fetchedProduct.customBrand) {
      const simpleProducts =
        await this.simpleProductRepository.findProductsByBrand(
          productId,
          (fetchedProduct.customBrand as Brand).id,
        );
      const parentListings =
        await this.parentListingRepository.findProductsByBrand(
          productId,
          (fetchedProduct.customBrand as Brand).id,
        );
      return [].concat(simpleProducts).concat(parentListings);
    }
    return [];
  }

  findParentListings() {
    return this.parentListingRepository.find({
      relations: ['childCategory'],
    });
  }

  findOne(id: string, findByTypeDto: FindByTypeDto) {
    if (findByTypeDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      return this.simpleProductRepository.findOne(id, {
        relations: [
          'childCategory',
          'vendor',
          'warnings',
          'customBrand',
          'specifications',
          'keyWords',
          'features',
          'primaryImage',
          'images',
          'attributeValues',
          'attributeValues.attribute',
          'attributeChoices',
          'attributeChoices.attribute',
        ],
      });
    }
    if (findByTypeDto.type == ProductTypeEnum.PARENT_LISTING) {
      return this.parentListingRepository.findOne(id, {
        relations: [
          'variations',
          'variationTheme',
          'variationTheme.attributes',
          'variationTheme.attributes.attributeChoices',
          'variationTheme.attributes.attributeValues',
          'childCategory',
          'customBrand',
          'primaryImage',
          'images',
          'specifications',
          'vendor',
          'reviews',
          'features',
          'keyWords',
          'warnings',
          'variations.variationAttributeChoices',
          'variations.variationAttributeValues',
          'variations.variationAttributeChoices.attribute',
          'variations.variationAttributeValues.attribute',
          'attributeValues',
          'attributeValues.attribute',
          'attributeChoices',
          'attributeChoices.attribute',
        ],
      });
    }
    return;
  }

  async updateVitalInfo(
    id: string,
    updateProductVitalInfoDto: UpdateProductVitalInfoDto,
  ) {

    if (updateProductVitalInfoDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id);

      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.productId = updateProductVitalInfoDto.productId;
      fetchedProduct.productIdType = updateProductVitalInfoDto.productIdType;
      fetchedProduct.arName = updateProductVitalInfoDto.arName;
      if (updateProductVitalInfoDto.condition)
        fetchedProduct.condition = updateProductVitalInfoDto.condition;
      fetchedProduct.name = updateProductVitalInfoDto.name;
      fetchedProduct.brand = updateProductVitalInfoDto.brand;
      fetchedProduct.manufacturer = updateProductVitalInfoDto.manufacturer;
      fetchedProduct.manufactureSerial =
        updateProductVitalInfoDto.manufactureSerial;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      console.log(fetchedProduct)
      return this.simpleProductRepository.save(fetchedProduct);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.arName = updateProductVitalInfoDto.arName;
      fetchedProduct.name = updateProductVitalInfoDto.name;
      fetchedProduct.brand = updateProductVitalInfoDto.brand;
      fetchedProduct.manufacturer = updateProductVitalInfoDto.manufacturer;
      fetchedProduct.manufactureSerial =
        updateProductVitalInfoDto.manufactureSerial;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      console.log(fetchedProduct)
      return this.parentListingRepository.save(fetchedProduct);
    }
  }

  async updateOffer(id: string, updateProductOfferDto: UpdateProductOfferDto) {
    console.log('hey im here')
    if (updateProductOfferDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      fetchedProduct.price = updateProductOfferDto.price;
      fetchedProduct.quantity = updateProductOfferDto.quantity;
      return this.simpleProductRepository.save(fetchedProduct);
    }
  }


  async updateProductActivation(id: string, updateProductActivationDto: UpdateProductActivationDto) {
    if (updateProductActivationDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id, {
        relations: ['vendor'],
      });
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.status != ProductStatusEnum.APPROVED) throw new NotAcceptableException('لم تتم الموافقة على المنتج بعد')
      fetchedProduct.isActive = updateProductActivationDto.isActive;
      return this.simpleProductRepository.save(fetchedProduct);

    }
    if (updateProductActivationDto.type == ProductTypeEnum.PARENT_LISTING) {
      const fetchedProduct = await this.parentListingRepository.findOne(id, {
        relations: ['vendor'],
      });
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.status != ProductStatusEnum.APPROVED) throw new NotAcceptableException('لم تتم الموافقة على المنتج بعد')
      fetchedProduct.isActive = updateProductActivationDto.isActive;
      return this.parentListingRepository.save(fetchedProduct);
    }
  }

  async updateDescription(
    id: string,
    UpdateProductDescriptionDto: UpdateProductDescriptionDto,
  ) {
    if (UpdateProductDescriptionDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.description = UpdateProductDescriptionDto.description;
      fetchedProduct.features = UpdateProductDescriptionDto.features;
      fetchedProduct.legalDisclaimer =
        UpdateProductDescriptionDto.legalDisclaimer;
      fetchedProduct.warnings = UpdateProductDescriptionDto.warnings;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      return this.simpleProductRepository.save(fetchedProduct);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.description = UpdateProductDescriptionDto.description;
      fetchedProduct.features = UpdateProductDescriptionDto.features;
      fetchedProduct.legalDisclaimer =
        UpdateProductDescriptionDto.legalDisclaimer;
      fetchedProduct.warnings = UpdateProductDescriptionDto.warnings;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      return this.parentListingRepository.save(fetchedProduct);
    }
  }
  async updateKeywords(
    id: string,
    UpdateProductKeywordsDto: UpdateProductKeywordsDto,
  ) {
    if (UpdateProductKeywordsDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');

      fetchedProduct.searchTerms = UpdateProductKeywordsDto.searchTerms;
      return this.simpleProductRepository.save(fetchedProduct);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(id);
      if (!fetchedProduct) throw new NotFoundException('product not found!');

      fetchedProduct.searchTerms = UpdateProductKeywordsDto.searchTerms;
      return this.parentListingRepository.save(fetchedProduct);
    }
  }
  async addKeywordFromProduct(
    productId: string,
    AddKeywordFromProductDto: AddKeywordFromProductDto,
  ) {
    if (AddKeywordFromProductDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      const keyword = new ProductKeyWord();
      keyword.value = AddKeywordFromProductDto.keyword;
      keyword.simpleProduct = fetchedProduct;
      await this.productKeyWordRepository.save(keyword);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
      );
      const keyword = new ProductKeyWord();
      keyword.value = AddKeywordFromProductDto.keyword;
      keyword.parentListing = fetchedProduct;
      await this.productKeyWordRepository.save(keyword);
    }
  }
  async removeKeywordFromProduct(
    productId: string,
    keywordId: string,
    type: ProductTypeEnum,
  ) {
    if (type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['keyWords'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      fetchedProduct.keyWords = (
        fetchedProduct.keyWords as ProductKeyWord[]
      ).filter((keyword) => keyword.id != keywordId);
      await this.simpleProductRepository.save(fetchedProduct);
      await this.productKeyWordRepository.delete(keywordId);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['keyWords'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      fetchedProduct.keyWords = (
        fetchedProduct.keyWords as ProductKeyWord[]
      ).filter((keyword) => keyword.id != keywordId);
      await this.parentListingRepository.save(fetchedProduct);
      await this.productKeyWordRepository.delete(keywordId);
    }
  }

  async removeWarningFromProduct(
    productId: string,
    warningId: string,
    type: ProductTypeEnum,
  ) {
    if (type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['warnings'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.warnings = (
        fetchedProduct.warnings as ProductWarning[]
      ).filter((warning) => warning.id != warningId);
      await this.simpleProductRepository.save(fetchedProduct);
      await this.productFeatureRepository.delete(warningId);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['warnings'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.warnings = (
        fetchedProduct.warnings as ProductWarning[]
      ).filter((warning) => warning.id != warningId);
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.parentListingRepository.save(fetchedProduct);
      await this.productwarningRepository.delete(warningId);
    }
  }

  async removeSpecificationFromProduct(
    productId: string,
    specificationId: string,
    type: ProductTypeEnum,
  ) {
    if (type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['specifications'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.specifications = (
        fetchedProduct.specifications as Specification[]
      ).filter((specification) => specification.id != specificationId);
      await this.simpleProductRepository.save(fetchedProduct);
      await this.specificationRepository.delete(specificationId);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['specifications'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.specifications = (
        fetchedProduct.specifications as Specification[]
      ).filter((specification) => specification.id != specificationId);
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.parentListingRepository.save(fetchedProduct);
      await this.specificationRepository.delete(specificationId);
    }
  }

  async addWarningFromProduct(
    productId: string,
    addWarningFromProductDto: AddWarningFromProductDto,
  ) {
    if (addWarningFromProductDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const warning = new ProductWarning();
      warning.value = addWarningFromProductDto.warning;
      warning.simpleProduct = fetchedProduct;

      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.simpleProductRepository.save(fetchedProduct);

      await this.productwarningRepository.save(warning);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
      );
      const warning = new ProductWarning();
      warning.value = addWarningFromProductDto.warning;
      warning.parentListing = fetchedProduct;

      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.parentListingRepository.save(fetchedProduct);

      await this.productwarningRepository.save(warning);
    }
  }

  async addSpecificationToProduct(
    productId: string,
    addSpecificationToProductDto: AddSpecificationToProductDto,
  ) {
    if (addSpecificationToProductDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const specification = new Specification();
      specification.value = addSpecificationToProductDto.value;
      specification.arKey = addSpecificationToProductDto.arKey;
      specification.key = addSpecificationToProductDto.key;
      specification.simpleProduct = fetchedProduct;
      await this.specificationRepository.save(specification);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const specification = new Specification();
      specification.value = addSpecificationToProductDto.value;
      specification.arKey = addSpecificationToProductDto.arKey;
      specification.key = addSpecificationToProductDto.key;
      specification.parentListing = fetchedProduct;
      await this.specificationRepository.save(specification);
    }
  }

  async removeFeatureFromProduct(
    productId: string,
    featureId: string,
    type: ProductTypeEnum,
  ) {
    if (type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['features'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.features = (
        fetchedProduct.features as ProductFeature[]
      ).filter((feature) => feature.id != featureId);
      await this.simpleProductRepository.save(fetchedProduct);
      await this.productFeatureRepository.delete(featureId);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['features'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.features = (
        fetchedProduct.features as ProductFeature[]
      ).filter((feature) => feature.id != featureId);
      await this.parentListingRepository.save(fetchedProduct);
      await this.productFeatureRepository.delete(featureId);
    }
  }

  async addFeatureFromProduct(
    productId: string,
    addFeatureFromProductDto: AddFeatureFromProductDto,
  ) {
    if (addFeatureFromProductDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const feature = new ProductFeature();
      feature.value = addFeatureFromProductDto.feature;
      feature.simpleProduct = fetchedProduct;
      await this.productFeatureRepository.save(feature);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const feature = new ProductFeature();
      feature.value = addFeatureFromProductDto.feature;
      feature.parentListing = fetchedProduct;
      await this.productFeatureRepository.save(feature);
    }
  }
  async updateVariation(id: string, UpdateVariationDto: UpdateVariationDto) {
    const fetchedVariation = await this.variationRepository.findOne(id, {
      relations: ['parentListing'],
    });
    if (!fetchedVariation) throw new NotFoundException('product not found!');
    if ((fetchedVariation.parentListing as ParentListing).isApproved == false) {
      fetchedVariation.productId = UpdateVariationDto.productId;
      fetchedVariation.productIdType = UpdateVariationDto.productIdType;
      fetchedVariation.condition = UpdateVariationDto.variationCondition;
    }

    fetchedVariation.price = UpdateVariationDto.variationPrice;
    fetchedVariation.quantity = UpdateVariationDto.variationQuantity;
    return this.variationRepository.save(fetchedVariation);
  }
  async updatePrimaryImage(
    id: string,
    UpdatePrimaryImageDto: UpdatePrimaryImageDto,
  ) {
    if (UpdatePrimaryImageDto.type == ProductTypeEnum.PARENT_LISTING) {
      const fetchedProduct = await this.parentListingRepository.findOne(id, {
        relations: ['primaryImage'],
      });

      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const fetchedImage = await this.fileRepository.findOne(
        UpdatePrimaryImageDto.primaryImage,
      );
      fetchedProduct.primaryImage = fetchedImage;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      return this.parentListingRepository.save(fetchedProduct);
    } else {
      const fetchedProduct = await this.simpleProductRepository.findOne(id, {
        relations: ['primaryImage'],
      });
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const fetchedImage = await this.fileRepository.findOne(
        UpdatePrimaryImageDto.primaryImage,
      );
      fetchedProduct.primaryImage = fetchedImage;
      fetchedProduct.status = ProductStatusEnum.PENDING;
      return this.simpleProductRepository.save(fetchedProduct);
    }
  }
  async removeImageFromProduct(
    productId: string,
    removeImageFromProductDto: RemoveImageFromProductDto,
  ) {
    if (removeImageFromProductDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['images'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      fetchedProduct.images = fetchedProduct.images.filter(
        (image) => image.id != removeImageFromProductDto.image,
      );
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.simpleProductRepository.save(fetchedProduct);

      await this.fileRepository.delete(removeImageFromProductDto.image);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['images'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')

      fetchedProduct.images = fetchedProduct.images.filter(
        (image) => image.id != removeImageFromProductDto.image,
      );
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.parentListingRepository.save(fetchedProduct);
      await this.fileRepository.delete(removeImageFromProductDto.image);
    }
  }
  async addImageToProductImage(
    productId: string,
    addImageToProductImageDto: AddImageToProductImageDto,
  ) {
    if (addImageToProductImageDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(
        productId,
        {
          relations: ['images'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const fetchedImage = await this.fileRepository.findOne(
        addImageToProductImageDto.image,
      );
      fetchedProduct.images.push(fetchedImage);
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.simpleProductRepository.save(fetchedProduct as SimpleProduct);
    } else {
      const fetchedProduct = await this.parentListingRepository.findOne(
        productId,
        {
          relations: ['images'],
        },
      );
      if (!fetchedProduct) throw new NotFoundException('product not found!');
      if (fetchedProduct.isApproved == true) throw new NotAcceptableException('تمت الموافقة على المنتج ولا يمكن تحديثه بعد الآن')
      const fetchedImage = await this.fileRepository.findOne(
        addImageToProductImageDto.image,
      );
      fetchedProduct.images.push(fetchedImage);
      fetchedProduct.status = ProductStatusEnum.PENDING;
      await this.parentListingRepository.save(fetchedProduct as ParentListing);
    }
  }

  async updateStatus(
    id: string,
    updateProductStatusDto: UpdateProductStatusDto,
  ) {
    if (updateProductStatusDto.status == ProductStatusEnum.PENDING)
      throw new BadRequestException('INVALID STATUS');

    if (updateProductStatusDto.type == ProductTypeEnum.PARENT_LISTING) {
      const fetchedProduct = await this.parentListingRepository.findOne(id,
        {
          relations: ['vendor', 'variations'],
        });
      if (!fetchedProduct) throw new NotFoundException('PRODUCT NOT FOUND');
      if (fetchedProduct.status != ProductStatusEnum.PENDING)
        throw new NotAcceptableException('اتخذ القرار بالفعل');

      if (updateProductStatusDto.status == ProductStatusEnum.REJECTED) {
        if (!updateProductStatusDto.rejectReason)
          throw new BadRequestException('PLEASE ENTER REJECTION REASON');
        fetchedProduct.rejectReason = updateProductStatusDto.rejectReason;
        fetchedProduct.status = updateProductStatusDto.status;
        for (const variation of fetchedProduct.variations) {
          variation.status = updateProductStatusDto.status;
        }
      }

      if (updateProductStatusDto.status == ProductStatusEnum.APPROVED) {
        fetchedProduct.status = updateProductStatusDto.status;
        fetchedProduct.isApproved = true;
        fetchedProduct.isActive = true;
        for (const variation of fetchedProduct.variations) {
          variation.status = updateProductStatusDto.status;
        }
      }
      const updatedProduct = await this.parentListingRepository.save(fetchedProduct);
      if (updatedProduct) this.eventEmitter.emit('product.status.updated', {
        product: updatedProduct.id,
        type: NotificationTypeEnum.PRODUCT,
        target: NotificationTargetEnum.USER,
        userIds: [(fetchedProduct.vendor as Vendor).id],
      } as ProductCreatedEvent);
    }

    if (updateProductStatusDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedProduct = await this.simpleProductRepository.findOne(id,
        {
          relations: ['vendor'],
        });
      if (!fetchedProduct) throw new NotFoundException('PRODUCT NOT FOUND');
      if (fetchedProduct.status != ProductStatusEnum.PENDING)
        throw new NotAcceptableException('اتخذ القرار بالفعل');

      if (updateProductStatusDto.status == ProductStatusEnum.REJECTED) {
        if (!updateProductStatusDto.rejectReason)
          throw new BadRequestException('PLEASE ENTER REJECTION REASON');
        fetchedProduct.rejectReason = updateProductStatusDto.rejectReason;
        fetchedProduct.status = updateProductStatusDto.status;
      }

      if (updateProductStatusDto.status == ProductStatusEnum.APPROVED) {
        fetchedProduct.status = updateProductStatusDto.status;
        fetchedProduct.isApproved = true;
        fetchedProduct.isActive = true;
      }
      const updatedProduct = await this.simpleProductRepository.save(fetchedProduct);
      if (updatedProduct) this.eventEmitter.emit('product.status.updated', {
        product: updatedProduct.id,
        type: NotificationTypeEnum.PRODUCT,
        target: NotificationTargetEnum.USER,
        userIds: [(fetchedProduct.vendor as Vendor).id],
      } as ProductCreatedEvent);
    }
  }

  getProductActiveDeal(productId: string) {
    return this.dealProductRepository.findProductActiveDeal(productId);
  }
}
