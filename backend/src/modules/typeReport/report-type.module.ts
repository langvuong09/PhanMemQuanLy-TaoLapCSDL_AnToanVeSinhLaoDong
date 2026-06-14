import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportType } from './report-type.entity';
import { ReportTypeService } from './report-type.service';
import { ReportTypeController } from './report-type.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportType]),
    PermissionModule
  ],
  controllers: [ReportTypeController],
  providers: [ReportTypeService],
  exports: [ReportTypeService]
})
export class ReportTypeModule {}