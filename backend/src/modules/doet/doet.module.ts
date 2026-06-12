import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoetController } from './doet.controller';
import { Doet } from './doet.entity';
import { DoetService } from './doet.service';
import { MediaModule } from '../media/media.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doet, User]),MediaModule],
  providers: [DoetService],
  controllers: [DoetController],
})
export class DoetModule {}
