import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Industry } from './industry.entity';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Industry]), PermissionModule],
  controllers: [IndustryController],
  providers: [IndustryService],
  exports: [IndustryService],
})
export class IndustryModule {}