import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateVerificationDto {
  @IsUUID()
  @IsNotEmpty()
  identityFront: string;

  @IsUUID()
  @IsNotEmpty()
  identityBack: string;

  @IsUUID()
  @IsNotEmpty()
  statementDocument: string;
}
