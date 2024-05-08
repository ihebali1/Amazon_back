import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFeaturedDepartmentDto {
  @IsUUID()
  @IsNotEmpty()
  department: string;
}
