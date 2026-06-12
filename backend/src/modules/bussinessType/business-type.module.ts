import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessType } from './business-type.entity';
import { BusinessTypeService } from './business-type.service';
import { BusinessTypeController } from './business-type.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessType]), PermissionModule],
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService],
  exports: [BusinessTypeService],
})
export class BusinessTypeModule {}