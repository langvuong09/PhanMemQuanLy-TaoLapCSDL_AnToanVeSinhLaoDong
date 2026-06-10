import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'OldPassword123!' })
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có tối thiểu 8 ký tự' })
  newPassword!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty({ message: 'Vui lòng xác nhận mật khẩu' })
  confirmPassword!: string;
}