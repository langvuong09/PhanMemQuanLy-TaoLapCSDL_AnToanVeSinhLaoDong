import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsObject } from 'class-validator';
import { KeyValue } from 'src/commons/bases/baseAddressEntity';

export class CreateDoetDto {
  @ApiProperty({ example: 'Công ty Cổ phần Công nghệ Quốc tế VNA' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: '910000888292' })
  @IsNotEmpty()
  @IsString()
  taxCode!: string;

  @ApiProperty({ example: '2020-01-01' })
  @IsNotEmpty()
  @IsDateString()
  issuedDate!: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  businessTypeId!: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  industryId!: number;

  @ApiProperty({ example: 'VNA Group', required: false })
  @IsOptional()
  @IsString()
  foreignName?: string;

  @ApiProperty({ example: 'Nguyễn Văn A', required: false })
  @IsOptional()
  @IsString()
  representative?: string;

  @ApiProperty({ example: '0987654321', required: false })
  @IsOptional()
  @IsString()
  repPhone?: string;

  @ApiProperty({ example: '0987654321', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '162 đường số 2' })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @ApiProperty({ example: 'Khu phố 2', required: false })
  @IsOptional()
  @IsString()
  quarter?: string;

  // --- Cấu trúc kiểu JSONB Object nhận từ FE ---
  @ApiProperty({ example: { key: '79', value: 'Thành phố Hồ Chí Minh' } })
  @IsNotEmpty()
  @IsObject()
  province!: KeyValue;

  @ApiProperty({ example: { key: '760', value: 'Quận 1' } })
  @IsNotEmpty()
  @IsObject()
  district!: KeyValue;

  @ApiProperty({ example: { key: '26734', value: 'Phường Bến Nghé' } })
  @IsNotEmpty()
  @IsObject()
  ward!: KeyValue;
}