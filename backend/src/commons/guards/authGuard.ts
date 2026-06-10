import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException, // Dùng Exception chuẩn
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import Response from '../../modules/response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<any>();
    const authHeader = req.headers['authorization'];
    Logger.debug(`Authorization header: ${authHeader}`);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const jwt = authHeader.split(' ')[1];

    try {
      const rs = await this.authService.validateToken(jwt, req.doet);
      Object.assign(req, rs.data);
      
      Logger.debug(`User authenticated: ${rs.data?.user?.username}`);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}