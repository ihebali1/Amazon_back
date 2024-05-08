import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Vendor } from 'src/users/entities/users.entity';
import { VendorStateEnum } from 'src/users/enum/vendor-state.enum';

@Injectable()
export class IsVendorActiveGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const { user } = context.switchToHttp().getRequest();
    if (!(user instanceof Vendor)) return false;
    if((user as Vendor).vendorState == VendorStateEnum.VERIFIED) return true
    else {
      throw new UnauthorizedException('لم يتم تأكيد حالة حسابك')
    }
  }
}
