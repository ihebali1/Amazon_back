import { Module } from '@nestjs/common';
import { ManagementPackService } from './management-pack.service';
import { ManagementPackController } from './management-pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementPack } from './entities/management-pack.entity';
import { ManagementPackRepository } from './repositories/management-pack.entity';
import { PermissionRepository } from 'src/permission/repositories/permission.repository';
import { AdminRepository } from 'src/users/repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ManagementPack,
      ManagementPackRepository,
      PermissionRepository,
      AdminRepository,
    ]),
  ],
  controllers: [ManagementPackController],
  providers: [ManagementPackService],
})
export class ManagementPackModule {}
