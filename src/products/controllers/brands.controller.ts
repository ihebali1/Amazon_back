import {
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from 'src/products/services/brand.service';
import { FindBrandsFilter } from '../dto/find-brand-filter.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandService) { }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brandService.findOne(id);
    }

    @Get()
    findAll(@Query() findBrandsFilter: FindBrandsFilter) {
        return this.brandService.findAll(findBrandsFilter);
    }

}
