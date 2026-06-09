import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private logger;
    private transporter;
    constructor(configService: ConfigService);
    sendMail(email: string, subject: string, html: string): Promise<boolean>;
}
