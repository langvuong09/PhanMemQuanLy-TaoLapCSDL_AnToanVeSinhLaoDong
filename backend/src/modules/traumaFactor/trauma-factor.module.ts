import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trauma } from './trauma-factor.entity';
import { TraumaController } from './trauma-factor.controller';
import { TraumaService } from './trauma-factor.service';
import { PermissionModule } from '../permission/permission.module';


@Module({
  imports: [TypeOrmModule.forFeature([Trauma]),PermissionModule],
  controllers: [TraumaController],
  providers: [TraumaService],
  exports: [TraumaService],
})
export class TraumaModule {}