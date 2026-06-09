import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Response, { ResponseData } from 'src/commons/response';
import { ViewService } from '../view/view.service';
import { CurrentUser, LoginModel } from './auth.model';
import { get } from 'lodash';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { extractHostname } from '../../helper/Domain';
import * as fs from 'fs';
import * as path from 'path';
import * as argon from 'argon2';
import { Doet } from '../doet/doet.entity';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/redis/redis.module';
import { getOtpKey, OtpType } from 'src/commons/enums/otp.enum';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/helper/Email';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly viewService: ViewService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async login(data: any, doet: Doet | null): Promise<ResponseData<LoginModel>> {
    try {
      const _doet = doet && doet.id ? doet.id : null;
      const user = new CurrentUser({
        ...data,
        doet: _doet,
      });
      const roleId = user.role?.id ?? 0;
      const [views, token] = await Promise.all([
        await this.viewService.getViewsByRoleId(roleId),
        await this.jwtService.sign({ ...user }),
      ]);
      const rs = new LoginModel(token, {
        views: get(views, 'data.items', []),
      });
      return Response.get<LoginModel>(rs);
    } catch (error) {
      throw Response.errorInternal(error);
    }
  }

  async validateToken(
    token: string,
    doet: Doet | null,
  ): Promise<ResponseData<LoginModel>> {
    try {
      const _doet = doet && doet.id ? doet.id : null;
      const decodedData = await this.jwtService.verifyAsync(token);
      const user = new CurrentUser({
        ...decodedData,
        doet: _doet,
      });
      const roleId = user.role?.id ?? 0;
      const views = await this.viewService.getViewsByRoleId(roleId);
      const rs = new LoginModel(token, {
        user,
        views: get(views, 'data.items', []),
      });

      return Response.get<LoginModel>(rs);
    } catch (error) {
      throw Response.errorInternal(error);
    }
  }

  async forgotPassword(email: string) {
    try {
      const manage = this.dataSource.manager;
      const user = await manage.findOne(User, {
        where: {
          email: email,
        },
      });
      if (!user) {
        return Response.errorNotFound('Not found email');
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const redisKey = getOtpKey(OtpType.FORGOT_PASSWORD, user.id);
      const ttl = this.configService.get<number>('OTP_EXPIRATION_TIME') || 300;
      await this.redis.set(redisKey, otp, 'EX', ttl);

      const templatePath = path.join(
        process.cwd(),
        'src',
        'templates',
        'forgot-password.html',
      );
      let template = fs.readFileSync(templatePath, { encoding: 'utf-8' });

      template = template.split('$1').join(user.fullName);
      template = template.split('$2').join(otp);
      template = template.split('$3').join((ttl / 60).toString());

      await this.emailService.sendMail(email, 'Mã xác thực lấy lại mật khẩu', template);
      return Response.SUCCESSFULLY;
    } catch (error) {
      throw Response.errorInternal(error);
    }
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { email },
    });
    if (!user) {
      return Response.errorNotFound('Not found email');
    }
    const redisKey = getOtpKey(OtpType.FORGOT_PASSWORD, user.id);
    const savedOtp = await this.redis.get(redisKey);

    if (!savedOtp || savedOtp !== otp) {
      return Response.errorInternal('OTP không đúng hoặc đã hết hạn');
    }

    const resetToken = this.jwtService.sign(
      { email, id: user.id },
      { expiresIn: '3m' },
    );
    return Response.get({ resetToken });
  }

  async resetPassword(resetToken: string, newPassword: string , confirmPassword: string) {
    try {
      const decoded: any = this.jwtService.verify(resetToken);

      if (newPassword !== confirmPassword) {
        return Response.errorInternal('Mật khẩu xác nhận không khớp');
      }

      const hashedPassword = await argon.hash(newPassword);
      await this.dataSource.manager.update(User, decoded.id, {
        password: hashedPassword,
      });

      return Response.SUCCESSFULLY;
    } catch (e) {
      return Response.errorInternal('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
