import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';
@Injectable()
export class AdminService {
  constructor(
    private adminRepository: AdminRepository,
    private mailerService: MailerService,
  ) { }

  public async findByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: {
        email: email,
      },
      select: ['password', 'email', 'id', 'firstName', 'lastName', 'role', 'managementPack'],
      relations: ['managementPack', 'managementPack.permissions'],
    });

    if (!admin) {
      throw new NotFoundException(`معلومات تسجيل دخول غير صالحة`);
    }
    return admin;
  }

  async create(createAdminDto: CreateAdminDto) {
    const fetchedAdmin = await this.adminRepository.findAdminByEmailOrPhone(
      createAdminDto.email,
      createAdminDto.phone,
    );
    if (fetchedAdmin)
      throw new ConflictException('EMAIL OR PHONE ALREADY EXISTS');
    const generatedPassword = bcrypt.hashSync('12345678', 8);
    const createdAdmin = await this.adminRepository.save({
      ...createAdminDto,
      password: generatedPassword,
    });
    delete createdAdmin.password;
    return createdAdmin;
  }

  findAll() {
    return this.adminRepository.find({
      relations: ['managementPack'],
    });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOne(id);
    if (!admin) throw new NotFoundException('ADMIN NOT FOUND');
    admin.firstName = updateAdminDto.firstName;
    admin.lastName = updateAdminDto.lastName;
    const adminWithPhoneCount = await this.adminRepository.count({
      id: Not(admin.id),
      phone: updateAdminDto.phone,
    });
    if (adminWithPhoneCount > 0)
      throw new ConflictException('PHONE ALREADY EXISTS');
    admin.phone = updateAdminDto.phone;
    return this.adminRepository.save(admin);
  }

  async activate(id: string) {
    try {
      return this.adminRepository.update(id, { active: true });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async disable(id: string) {
    try {
      return this.adminRepository.update(id, { active: false });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async isEmailExist(email: string): Promise<boolean> {
    const user = await this.adminRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  findOne(id: string) {
    return this.adminRepository.findOne(id, {
      relations: ['managementPack', 'managementPack.permissions'],
    });
  }

  public sendMailAdminAccount(admin, generatedPassword) {
    this.mailerService
      .sendMail({
        to: admin.email,
        from: 'alaa.assali1996@gmail.com',
        subject: 'Your account credentials ✔',
        text: 'Welcome here!',
        template: `${process.cwd()}/templates/emails/index`,
        context: {
          title: 'Registration successfully',
          description: `Your Temporary password code is : ${generatedPassword}`,
          nameUser: admin.name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('Admin Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Admin Registration: Send Mail Failed!');
      });
  }
}
