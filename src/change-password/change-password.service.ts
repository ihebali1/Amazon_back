import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AdminRepository } from 'src/users/repositories/admin.repository';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly mailerService: MailerService,
    private readonly adminRepository: AdminRepository,
  ) { }

  public async updatePassword(
    userId: string,
    changePassword: ChangePasswordDto,
  ): Promise<any | { status: number; message: string }> {
    const fetchedUser = await this.userRepository.findOne(userId);
    if (!fetchedUser) throw new NotFoundException('USER NOT FOUND');
    if (changePassword.oldPassword == changePassword.newPassword)
      throw new BadRequestException('يجب أن تكون كلمة المرور القديمة والجديدة مختلفة');
    const passwordIsValid = bcrypt.compareSync(
      changePassword.oldPassword,
      fetchedUser.password,
    );
    if (passwordIsValid == false)
      throw new BadRequestException('كلمة مرور خاطئة');
    fetchedUser.password = bcrypt.hashSync(changePassword.newPassword, 8);

    await this.userRepository.save(fetchedUser);
    return this.sendMailChangePassword(fetchedUser);
  }
  public async updatePasswordAdmin(
    adminId: string,
    changePassword: ChangePasswordDto,
  ): Promise<any | { status: number; message: string }> {
    const fetchedAdmin = await this.adminRepository.findOne(adminId, {
      select: ['id', 'password'],
    });
    if (!fetchedAdmin) throw new NotFoundException('ADMIN NOT FOUND');
    if (changePassword.oldPassword == changePassword.newPassword)
      throw new BadRequestException('يجب أن تكون كلمة المرور القديمة والجديدة مختلفة');
    const passwordIsValid = bcrypt.compareSync(
      changePassword.oldPassword,
      fetchedAdmin.password,
    );
    if (passwordIsValid == false)
      throw new BadRequestException('كلمة مرور خاطئة');
    fetchedAdmin.password = bcrypt.hashSync(changePassword.newPassword, 8);

    await this.adminRepository.save(fetchedAdmin);
    return this.sendMailChangePassword(fetchedAdmin);
  }

  private sendMailChangePassword(user): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: process.env.MAIL_USER,
        subject: 'Change Password successful ✔',
        text: 'Change Password successful!',
      })
      .then((response) => {
        console.log(response);
        console.log('Change Password: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Change Password: Send Mail Failed!');
      });
  }
}
