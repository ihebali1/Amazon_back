import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { AddFeatureFromProductDto } from '../dto/add-feature-from-product.dto';
import { AddImageToProductImageDto } from '../dto/add-image-to-product-image.dto';
import { AddKeywordFromProductDto } from '../dto/add-keyword-from-product.dto';
import { AddSpecificationToProductDto } from '../dto/add-specification-to-product.dto';
import { AddWarningFromProductDto } from '../dto/add-warning-from-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindByTypeDto } from '../dto/find-by-type.dto';
import { FindProductsDto } from '../dto/find-products-dto';
import { FindVendorProductsDto } from '../dto/find-vendor-products.dto';
import { RemoveFeatureFromProductDto } from '../dto/remove-feature-from-product.dto';
import { RemoveImageFromProductDto } from '../dto/remove-image-from-product.dto';
import { RemoveKeywordFromProductDto } from '../dto/remove-keyword-from-product.dto';
import { RemoveSpecificationFromProductDto } from '../dto/remove-specification-from-product.dto';
import { RemoveWarningFromProductDto } from '../dto/remove-warning-from-product-dto';
import { UpdatePrimaryImageDto } from '../dto/update-primary-image.dto';
import { UpdateProductActivationDto } from '../dto/update-product-activation.dto';
import { UpdateProductDescriptionDto } from '../dto/update-product-description.dto';
import { UpdateProductKeywordsDto } from '../dto/update-product-keywords.dto';
import { UpdateProductOfferDto } from '../dto/update-product-offer.dto';
import { UpdateProductVitalInfoDto } from '../dto/update-product-vital-info.dto';
import { UpdateVariationDto } from '../dto/update-variation.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //Create product
  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: Users,
  ) {
    return this.productsService.create(createProductDto, user.id);
  }

  // Get vendor's products
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findVendorProducts(
    @CurrentUser() user: Users,
    @Query() findVendorProductsFilter: FindVendorProductsDto,
  ): Promise<any[]> {
    return this.productsService.findVendorProducts(
      user.id,
      findVendorProductsFilter,
    );
  }

  @Get('vendor/:id')
  findVendorApprovedProducts(@Param('id') id: string) {
    return this.productsService.findVendorApprovedProducts(id);
  }

  // Get product list
  @Get()
  findAll(@Query() findProductsFilter: FindProductsDto) {
    return this.productsService.findAll(findProductsFilter);
  }

  @Get('department/:id/active')
  findActiveProductByDepartment(@Param('id') id: string) {
    return this.productsService.findActiveProductsByDepartment(id);
  }

  @Get('simple')
  findSimpleProducts() {
    return this.productsService.findSimpleProducts();
  }

  @Get('parent-listing')
  findParentListing() {
    return this.productsService.findParentListings();
  }

  @Get('hot-new-arrival')
  findHotNewArrivalProducts(@Query() findProductsFilter: FindProductsDto) {
    return this.productsService.findHotNewArrivalActiveProducts(
      findProductsFilter,
    );
  }
  @Get(':id/active-deal')
  findProductActiveDeal(@Param('id') id: string) {
    return this.productsService.getProductActiveDeal(id);
  }

  @Get(':id/same-brand')
  getSameBrandProducts(
    @Param('id') id: string,
    @Query() findByTypeDto: FindByTypeDto,
  ) {
    return this.productsService.getSameBrandProducts(id, findByTypeDto.type);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() findByTypeDto: FindByTypeDto) {
    return this.productsService.findOne(id, findByTypeDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/activation')
  updateProductActivation(
    @Param('id') id: string,
    @Body() updateProductActivationDto: UpdateProductActivationDto,
  ) {
    return this.productsService.updateProductActivation(id, updateProductActivationDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/vital-info')
  update(
    @Param('id') id: string,
    @Body() updateProductVitalInfoDto: UpdateProductVitalInfoDto,
  ) {
    return this.productsService.updateVitalInfo(id, updateProductVitalInfoDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/offer')
  updateOffer(
    @Param('id') id: string,
    @Body() updateProductOfferDto: UpdateProductOfferDto,
  ) {
    return this.productsService.updateOffer(id, updateProductOfferDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/description')
  updateDescription(
    @Param('id') id: string,
    @Body() updateProductDescriptionDto: UpdateProductDescriptionDto,
  ) {
    return this.productsService.updateDescription(
      id,
      updateProductDescriptionDto,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/keywords')
  updateKeywords(
    @Param('id') id: string,
    @Body() UpdateProductKeywordsDto: UpdateProductKeywordsDto,
  ) {
    return this.productsService.updateKeywords(id, UpdateProductKeywordsDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/keywords/add')
  addKeywordFromProduct(
    @Param('id') id: string,
    @Body() addKeywordFromProductDto: AddKeywordFromProductDto,
  ) {
    return this.productsService.addKeywordFromProduct(
      id,
      addKeywordFromProductDto,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/features/add')
  addFeatureFromProduct(
    @Param('id') id: string,
    @Body() addFeatureFromProductDto: AddFeatureFromProductDto,
  ) {
    return this.productsService.addFeatureFromProduct(
      id,
      addFeatureFromProductDto,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/keywords/:keywordId')
  removeKeywordFromProduct(
    @Param('id') id: string,
    @Param('keywordId') keywordId: string,
    @Body() removeKeywordFromProductDto: RemoveKeywordFromProductDto,
  ) {
    return this.productsService.removeKeywordFromProduct(
      id,
      keywordId,
      removeKeywordFromProductDto.type,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/features/:featureId')
  removeFeatureFromProduct(
    @Param('id') id: string,
    @Param('featureId') featureId: string,
    @Body() removeFeatureFromProductDto: RemoveFeatureFromProductDto,
  ) {
    return this.productsService.removeFeatureFromProduct(
      id,
      featureId,
      removeFeatureFromProductDto.type,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/warnings/add')
  addWarningFromProduct(
    @Param('id') id: string,
    @Body() addWarningFromProductDto: AddWarningFromProductDto,
  ) {
    return this.productsService.addWarningFromProduct(
      id,
      addWarningFromProductDto,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/specifications/add')
  addSpecificationToProduct(
    @Param('id') id: string,
    @Body() addSpecificationToProductDto: AddSpecificationToProductDto,
  ) {
    return this.productsService.addSpecificationToProduct(
      id,
      addSpecificationToProductDto,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/warnings/:warningId')
  removeWarningFromProduct(
    @Param('id') id: string,
    @Param('warningId') warningId: string,
    @Body() removeWarningFromProductDto: RemoveWarningFromProductDto,
  ) {
    return this.productsService.removeWarningFromProduct(
      id,
      warningId,
      removeWarningFromProductDto.type,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/specifications/:specificationId')
  removeSpecificationFromProduct(
    @Param('id') id: string,
    @Param('specificationId') specificationId: string,
    @Body()
    removeSpecificationFromProductDto: RemoveSpecificationFromProductDto,
  ) {
    return this.productsService.removeSpecificationFromProduct(
      id,
      specificationId,
      removeSpecificationFromProductDto.type,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/variation')
  updateVariation(
    @Param('id') id: string,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.productsService.updateVariation(id, updateVariationDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/primaryImage')
  updatePrimaryImage(
    @Param('id') id: string,
    @Body() updatePrimaryImageDto: UpdatePrimaryImageDto,
  ) {
    return this.productsService.updatePrimaryImage(id, updatePrimaryImageDto);
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/images/add')
  addImageToProductImage(
    @Param('id') id: string,
    @Body() addImageToProductImage: AddImageToProductImageDto,
  ) {
    return this.productsService.addImageToProductImage(
      id,
      addImageToProductImage,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/images')
  removeImageFromProduct(
    @Param('id') id: string,
    @Body() removeImageFromProductDto: RemoveImageFromProductDto,
  ) {
    return this.productsService.removeImageFromProduct(
      id,
      removeImageFromProductDto,
    );
  }
}
