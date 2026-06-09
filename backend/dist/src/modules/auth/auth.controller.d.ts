import { LoginModel } from './auth.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<import("../../commons").ResponseData<LoginModel>>;
    forgotPassword(email: string): Promise<import("../../commons/error").NotFoundException | {
        code: import("@nestjs/common").HttpStatus;
        message: string;
        success: boolean;
    }>;
    verifyOtp(email: string, otp: string): Promise<import("../../commons/error").NotFoundException | import("../../commons/error").SomethingException | import("../../commons").ResponseData<{
        resetToken: string;
    }>>;
    resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<import("../../commons/error").SomethingException | {
        code: import("@nestjs/common").HttpStatus;
        message: string;
        success: boolean;
    }>;
}
