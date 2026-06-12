import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessTypeDto {
  @ApiProperty({ example: 'DN_TU_NHAN', description: 'Mã loại hình doanh nghiệp (Duy nhất)' })
  @IsNotEmpty({ message: 'Mã loại hình không được để trống' })
  @IsString({ message: 'Mã loại hình phải là chuỗi ký tự' })
  code!: string;

  @ApiProperty({ example: 'Doanh nghiệp tư nhân', description: 'Tên loại hình doanh nghiệp' })
  @IsNotEmpty({ message: 'Tên loại hình không được để trống' })
  @IsString({ message: 'Tên loại hình phải là chuỗi ký tự' })
  name!: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái hoạt động phải là true/false' })
  isActive?: boolean;
}