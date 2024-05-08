import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminRoleEnum } from '../../users/enum/admin-role.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflator: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const currentPermissions = this.reflator.get<string[], string>(
      'PERMISSIONS',
      context.getHandler(),
    );

    if (!currentPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if(user.role == AdminRoleEnum.SUPER_ADMIN) return true;
    const allAdminPermissions = user?.managementPack.permissions;

    return currentPermissions.every((permission) => {
      return allAdminPermissions.some((adminPermission) => {
        return adminPermission.name === permission;
      });
    });
  }
}