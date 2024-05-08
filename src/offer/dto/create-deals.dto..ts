import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  registerDecorator,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DealsTypeEnum } from '../enums/deals-type.enum';
import { CreateProductDealDto } from './create-product-deal.dto';

export class CreateDealsDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @IsArrayOfObjects()
  @Type(() => CreateProductDealDto)
  productDeals: CreateProductDealDto[];

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(23)
  @IsOptional()
  hours: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DealsTypeEnum)
  type: DealsTypeEnum;
}

export function IsArrayOfObjects(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsArrayOfObjects',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return (
            Array.isArray(value) &&
            value.every(
              (element: any) =>
                element instanceof Object && !(element instanceof Array),
            )
          );
        },
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} must be an array of objects`,
      },
    });
  };
}
