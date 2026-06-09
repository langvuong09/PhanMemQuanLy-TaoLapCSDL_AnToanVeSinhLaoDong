import { Logger } from '@nestjs/common';
import * as smtpapi from 'smtpapi';
import * as nodemailer from 'nodemailer';

const EMAIL_SENDGRID_KEY = process.env.SENDGRID_KEY || '';
export default class Email {
  static sendMail = async (email: string, subject: string, data_html: string, data_text: string = '') => {
    const msg = {
      to: email,
      from: 'info@rcp.com.vn',
      subject: subject,
      text: data_text,
      html: data_html,
    }

    return new Promise((resolve, reject) => {
      const header = new smtpapi();
      const headers = {
        'x-smtpapi': header.jsonString()
      };
      const settings = {
        host: 'smtp.sendgrid.net',
        port: 587,
        requiresAuth: true,
        auth: {
          user: 'apikey',
          pass: EMAIL_SENDGRID_KEY,
        },
      };
      const smtpTransport = nodemailer.createTransport(settings);
      const mailOptionsNew = { ...msg, headers };
      smtpTransport.sendMail(mailOptionsNew, (error, response) => {
        smtpTransport.close();
        if (error) {
          Logger.error(error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
