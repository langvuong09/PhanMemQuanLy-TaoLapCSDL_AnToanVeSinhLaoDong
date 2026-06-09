import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'eyJhbGci...' })
  token!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  newPassword!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  confirmPassword!: string;
}