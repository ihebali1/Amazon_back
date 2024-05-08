import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transporter, Users } from 'src/users/entities/users.entity';
import { JwtPayload } from '../interfaces/jwt.payload';
import { Admin } from 'src/users/entities/admin.entity';
import { AdminRepository } from 'src/users/repositories/admin.repository';
import { TransporterRepository } from 'src/transporter/repositories/transporter.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private adminRepository: AdminRepository,
    private transporterRepository: TransporterRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: JwtPayload): Promise<Users | Admin | Transporter> {
    const { id } = payload;
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const admin = await this.adminRepository.findOne(id, {
        relations: ['managementPack', 'managementPack.permissions']
      });
      if (admin) {
        return admin;
      }
      if (!admin) {
        const trans = await this.transporterRepository.findOne(id);
        if (trans) {
          return trans;
        }
      }
      throw new UnauthorizedException();
    }
    return user;
  }
}
