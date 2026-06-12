import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'OldPassword123!' })
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Mật khẩu phải bao gồm: chữ hoa, chữ thường, số hoặc ký tự đặc biệt' }
  )
  newPassword!: string;

  @ApiProperty({ example: 'ConfirmPassword123!' })
  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Mật khẩu phải bao gồm: chữ hoa, chữ thường, số hoặc ký tự đặc biệt' }
  )
  confirmPassword!: string;
}