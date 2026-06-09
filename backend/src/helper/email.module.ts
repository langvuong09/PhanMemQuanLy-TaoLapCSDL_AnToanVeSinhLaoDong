import { Module, Global } from '@nestjs/common';
import { EmailService } from './Email';

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}