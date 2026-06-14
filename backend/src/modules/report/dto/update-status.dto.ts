import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ReportStatus } from '../report.entity';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(ReportStatus)
  status!: ReportStatus;

  @IsOptional()
  @IsString()
  note?: string;
}