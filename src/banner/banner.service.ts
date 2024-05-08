import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';
import { ParentListingRepository } from 'src/products/repositories/parent-listing.repository';
import { SimpleProductRepository } from 'src/products/repositories/simple-product.repository';
import { CreateBannerDto } from './dto/create-banner.dto';
import { FindBannerDto } from './dto/find-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { DepartmentBanner, ProductBanner, VendorBanner } from './entities/banner.entity';
import { BannerLinkTypeEnum } from './enums/banner-link-type.enum';
import { BannerRepository } from './repositories/banner.repository';
import { DepartmentBannerRepository } from './repositories/department-banner.repository';
import { ProductBannerRepository } from './repositories/product-banner.repository';
import { VendorBannerRepository } from './repositories/vendor-banner.repository';

@Injectable()
export class BannerService {

  constructor(private bannerRepository: BannerRepository,
    private productBannerRepository: ProductBannerRepository,
    private departmentBannerRepository: DepartmentBannerRepository,
    private vendorBannerRepository: VendorBannerRepository,
    private simpleProductRepository: SimpleProductRepository,
    private parentListingRepository: ParentListingRepository,
  ) {

  }
  async create(createBannerDto: CreateBannerDto) {
    if (createBannerDto.linkType == BannerLinkTypeEnum.PRODUCT) {
      if (createBannerDto.productType == ProductTypeEnum.SIMPLE_LISTING) {
        const product = await this.simpleProductRepository.findOne(createBannerDto.product);
        if (!product) throw new NotFoundException('المنتج غير موجود');

        const productBanner = new ProductBanner();
        productBanner.simpleProduct = product;
        productBanner.image = createBannerDto.image;
        productBanner.type = createBannerDto.type;
        return this.productBannerRepository.save(productBanner);
      }
      if (createBannerDto.productType == ProductTypeEnum.PARENT_LISTING) {
        const product = await this.parentListingRepository.findOne(createBannerDto.product);
        if (!product) throw new NotFoundException('المنتج غير موجود');

        const productBanner = new ProductBanner();
        productBanner.parentListing = product;
        productBanner.image = createBannerDto.image;
        productBanner.type = createBannerDto.type;
        return this.productBannerRepository.save(productBanner);
      }
    }

    if (createBannerDto.linkType == BannerLinkTypeEnum.DEPARTMENT) {
      const departmentBanner = new DepartmentBanner();
      departmentBanner.department = createBannerDto.department;
      departmentBanner.image = createBannerDto.image;
      departmentBanner.type = createBannerDto.type;
      return this.departmentBannerRepository.save(departmentBanner);
    }

    if (createBannerDto.linkType == BannerLinkTypeEnum.VENDOR) {
      const vendorBanner = new VendorBanner();
      vendorBanner.vendor = createBannerDto.vendor;
      vendorBanner.image = createBannerDto.image;
      vendorBanner.type = createBannerDto.type;
      return this.vendorBannerRepository.save(vendorBanner);
    }
  }

  async changeStatus(id: string) {
    const fetchedBanner = await this.bannerRepository.findOne(id);
    if (!fetchedBanner) throw new NotFoundException('لافتة غير موجودة')
    fetchedBanner.isActive = !fetchedBanner.isActive;
    return this.bannerRepository.save(fetchedBanner);
  }

  findOne(id: string) {
    return this.bannerRepository.findOne(id,
      { relations: ['simpleProduct', 'parentListing', 'department', 'vendor', 'image'], });
  }

  findAll(findBannerFilter?: FindBannerDto) {
    if (!findBannerFilter.linkType && !findBannerFilter.type) return this.bannerRepository.find(
      { relations: ['simpleProduct', 'parentListing', 'department', 'vendor', 'image'], }
    )
    if (findBannerFilter.type && findBannerFilter.linkType) {
      if (findBannerFilter.linkType == BannerLinkTypeEnum.PRODUCT)
        return this.productBannerRepository.find(
          {
            relations: ['simpleProduct', 'parentListing', 'image'],
            where: { type: findBannerFilter.type }
          }
        )

      if (findBannerFilter.linkType == BannerLinkTypeEnum.DEPARTMENT)
        return this.departmentBannerRepository.find(
          {
            relations: ['department', 'image'],
            where: { type: findBannerFilter.type }
          }
        )

      if (findBannerFilter.linkType == BannerLinkTypeEnum.VENDOR)
        return this.vendorBannerRepository.find(
          {
            relations: ['vendor', 'image'],
            where: { type: findBannerFilter.type }
          }
        )
    } else if (findBannerFilter.type && !findBannerFilter.linkType) {
      return this.bannerRepository.find(
        {
          relations: ['simpleProduct', 'parentListing', 'image', 'department', 'vendor'],
          where: { type: findBannerFilter.type }
        }
      )
    }

  }

  remove(id: string) {
    return this.bannerRepository.delete(id);
  }
}
