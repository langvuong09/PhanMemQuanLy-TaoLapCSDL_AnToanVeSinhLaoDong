import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoetController } from './doet.controller';
import { Doet } from './doet.entity';
import { DoetService } from './doet.service';
import { MediaModule } from '../media/media.module';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { PermissionModule } from 'src/modules/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doet, User, Role]), MediaModule, PermissionModule],
  providers: [DoetService],
  controllers: [DoetController],
})
export class DoetModule {}
