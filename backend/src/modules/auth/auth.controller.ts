import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../commons/guards/localAuthGuard';
import { LoginModel } from './auth.model';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Login with username and password',
  })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user, req.doet);
  }

  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOperation({ summary: 'Gửi mã OTP về email' })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post("verify-otp")
    @ApiBody({ type: VerifyOtpDto })
  @ApiOperation({ summary: "Xác thực mã OTP" })
  async verifyOtp(
    @Body("email") email: string,
    @Body("otp") otp: string
  ) {
    return this.authService.verifyOtp(email, otp);
  }
  
  @Post("reset-password")
  @ApiBody({ type: ResetPasswordDto })
  @ApiOperation({ summary: "Đổi mật khẩu bằng Reset Token" })
  async resetPassword(
    @Body("token") token: string,
    @Body("newPassword") newPassword: string,
    @Body("confirmPassword") confirmPassword: string
  ) {
    return this.authService.resetPassword(token, newPassword, confirmPassword);
  }
}
