import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(email: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({
        from: '"Hệ thống VNA" <lehuuhuy211405@gmail.com>',
        to: email,
        subject,
        html,
      });
      this.logger.log(`Email đã gửi thành công tới: ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`Lỗi gửi email:`, error);
      return false;
    }
  }
}