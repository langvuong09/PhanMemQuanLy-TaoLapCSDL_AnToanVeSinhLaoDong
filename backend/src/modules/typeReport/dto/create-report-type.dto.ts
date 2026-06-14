import { IsNotEmpty, IsString, IsInt, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportTypeDto {
  @ApiProperty({ example: 'Báo cáo tai nạn lao động' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 2022 })
  @IsNotEmpty()
  @IsInt()
  year!: number;

  @ApiProperty({ example: 'Cả năm' })
  @IsNotEmpty()
  @IsString()
  period!: string;

  @ApiProperty({ example: '2023-12-15' })
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2024-01-10' })
  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}