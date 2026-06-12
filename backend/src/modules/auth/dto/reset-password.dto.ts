import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Matches, ValidateIf } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'eyJhbGci...', description: 'Reset Token nhận được từ email' })
  @IsNotEmpty({ message: 'Token không được để trống' })
  token!: string;

  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Mật khẩu phải bao gồm: chữ hoa, chữ thường, số hoặc ký tự đặc biệt' }
  )
  newPassword!: string;

  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Mật khẩu phải bao gồm: chữ hoa, chữ thường, số hoặc ký tự đặc biệt' }
  )
  confirmPassword!: string;
}