import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../enums/permissions.enum';

export const RequiredPermissions = (...permissions: Permissions[]) =>
  SetMetadata('PERMISSIONS', permissions);
