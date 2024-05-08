import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from './repositories/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  findAll() {
    return this.permissionRepository.find();
  }
}
