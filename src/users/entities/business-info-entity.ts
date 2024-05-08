import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';
import { BusinessType } from '../enum/business-type.enum';

export class BusinessInfo {
  @ApiProperty({ required: true })
  @IsEnum(BusinessType)
  @IsNotEmpty()
  type: BusinessType;

  @Column()
  businessName: string;

  @Column()
  numberCompany: string;

  @Column()
  storeName: string;

  @Column({
    type: 'longtext',
  })
  storeDescription: string;
}
