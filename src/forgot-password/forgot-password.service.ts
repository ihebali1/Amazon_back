import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/users/entities/admin.entity';
import { AdminRepository } from 'src/users/repositories/admin.repository';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private adminRepository: AdminRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    const userUpdate = await this.userRepository.findOne({
      email: forgotPasswordDto.email,
    });
    const passwordRand = Math.random().toString(36).slice(-8);
    userUpdate.password = bcrypt.hashSync(passwordRand, 8);

    this.sendMailForgotPassword(userUpdate.email, passwordRand);

    return await this.userRepository.save(userUpdate);
  }
  public async forgotPasswordAdmin(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    const adminUpdate = await this.adminRepository.findOne({
      email: forgotPasswordDto.email,
    });
    const passwordRand = Math.random().toString(36).slice(-8);
    adminUpdate.password = bcrypt.hashSync(passwordRand, 8);

    this.sendMailForgotPassword(adminUpdate.email, passwordRand);

    return await this.adminRepository.save(adminUpdate);
  }

  private sendMailForgotPassword(email, password): void {
    this.mailerService
      .sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Forgot Password successful ✔',
        text: `Forgot Password successful! your temporary password is ${password}`,
        //template: `index`,
      })
      .then((response) => {
        console.log(response);
        console.log('Forgot Password: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('Forgot Password: Send Mail Failed!');
      });
  }
}
