import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportDetail } from './report-detail.entity';
import { FileEntity } from '../media/media.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report, 
      ReportDetail, 
      FileEntity
    ]),
    PermissionModule
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService] 
})
export class ReportModule {}