import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Permission } from 'src/permission/entities/permission.entity';
import { PermissionRepository } from 'src/permission/repositories/permission.repository';
import { Admin } from 'src/users/entities/admin.entity';
import { AdminRepository } from 'src/users/repositories/admin.repository';
import { Not } from 'typeorm';
import { CreateManagementPackDto } from './dto/create-management-pack.dto';
import { UpdateManagementPackDto } from './dto/update-management-pack.dto';
import { ManagementPack } from './entities/management-pack.entity';
import { ManagementPackRepository } from './repositories/management-pack.entity';

@Injectable()
export class ManagementPackService {
  constructor(
    private managemenetPackRepository: ManagementPackRepository,
    private PermissionRepository: PermissionRepository,
    private adminRepository: AdminRepository,
  ) {}

  async create(createManagementPackDto: CreateManagementPackDto) {
    const fetchManagementPack = await this.managemenetPackRepository.findOne({
      name: createManagementPackDto.name,
    });
    if (fetchManagementPack) throw new ConflictException('DUPLICATED NAME');
    const managementPack = new ManagementPack();
    managementPack.name = createManagementPackDto.name;
    const createdManagementPack = await this.managemenetPackRepository.findOne(
      (
        await this.managemenetPackRepository.save(managementPack)
      ).id,
      {
        relations: ['permissions', 'admins'],
      },
    );
    if (
      createManagementPackDto.permissions &&
      createManagementPackDto.permissions.length > 0
    ) {
      for (const permission of createManagementPackDto.permissions) {
        const fetchedPermission = await this.PermissionRepository.findOne(
          permission,
        );
        createdManagementPack.permissions.push(fetchedPermission as Permission);
      }
      await this.managemenetPackRepository.save(createdManagementPack);
    }

    if (
      createManagementPackDto.admins &&
      createManagementPackDto.admins.length > 0
    ) {
      for (const admin of createManagementPackDto.admins) {
        const fetchedAdmin = await this.adminRepository.findOne(admin);
        createdManagementPack.admins.push(fetchedAdmin as Admin);
      }
      await this.managemenetPackRepository.save(createdManagementPack);
    }
    return createdManagementPack;
  }

  findAll() {
    return this.managemenetPackRepository.find({
      relations: ['permissions'],
    });
  }

  findOne(id: string) {
    return this.managemenetPackRepository.findOne(id, {
      relations: ['permissions'],
    });
  }

  findAllFullDetails() {
    return this.managemenetPackRepository.find({
      relations: ['permissions', 'admins'],
    });
  }

  async findAvailablePermissions(managementPackId: string) {
    const permissions = await this.PermissionRepository.find({
      relations: ['managementPacks'],
    });
    const fetchedManagementPack = await this.managemenetPackRepository.findOne(
      managementPackId,
      {
        relations: ['permissions'],
      },
    );
    if (!fetchedManagementPack)
      throw new NotFoundException('MANAGEMENT PÄCK NOT FOUND');
    const availablePermissions = [];
    for (const permission of permissions) {
      let exist = false;
      for (const packPermission of fetchedManagementPack.permissions) {
        if (permission.id == packPermission.id) exist = true;
      }
      if (exist == false) availablePermissions.push(permission);
    }
    return availablePermissions;
  }

  async findAvailableAdmins(managementPackId: string) {
    const admins = await this.adminRepository.find({
      relations: ['managementPack'],
    });
    const avaialableAdmins = [];
    for (const admin of admins) {
      if (
        (admin.managementPack as ManagementPack) == null ||
        (admin.managementPack as ManagementPack).id != managementPackId
      )
        avaialableAdmins.push(admin);
    }
    return avaialableAdmins;
  }

  findOneFullDetails(id: string) {
    return this.managemenetPackRepository.findOne(id, {
      relations: ['permissions', 'admins'],
    });
  }

  async update(id: string, updateManagementPackDto: UpdateManagementPackDto) {
    //return this.managemenetPackRepository.update(id, updateManagementPackDto);
    const fetchedManagementPack = await this.managemenetPackRepository.findOne(
      id,
      {
        relations: ['permissions', 'admins'],
      },
    );
    if (updateManagementPackDto.name)
      fetchedManagementPack.name = updateManagementPackDto.name;
    if (updateManagementPackDto.admins) {
      fetchedManagementPack.admins = [];
      for (const admin of updateManagementPackDto.admins) {
        const fetchedAdmin = await this.adminRepository.findOne(admin);
        fetchedManagementPack.admins.push(fetchedAdmin);
      }
    }

    if (updateManagementPackDto.permissions) {
      fetchedManagementPack.permissions = [];
      for (const permission of updateManagementPackDto.permissions) {
        const fetchedPermission = await this.PermissionRepository.findOne(
          permission,
        );
        fetchedManagementPack.permissions.push(fetchedPermission);
      }
    }
    return this.managemenetPackRepository.save(fetchedManagementPack);
  }

  async remove(id: string) {
    const fetchedManagementPack = await this.managemenetPackRepository.findOne(
      id,
    );
    if (!fetchedManagementPack)
      throw new NotFoundException('MANAGEMENT PACK NOT FOUND');
    fetchedManagementPack.permissions = [];
    fetchedManagementPack.admins = [];
    await this.managemenetPackRepository.save(fetchedManagementPack);
    await this.managemenetPackRepository.delete(id);
    return;
  }
}
