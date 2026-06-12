import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let code = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = status;
      const errorResponse: any = exception.getResponse();
      
      if (typeof errorResponse === 'object' && errorResponse !== null) {
        if (Array.isArray(errorResponse.message)) {
          message = errorResponse.message[0]; 
        } else {
          message = errorResponse.message || errorResponse.error || JSON.stringify(errorResponse);
        }
      } else {
        message = errorResponse;
      }
    } 
    else if (exception instanceof Error) {
      const dbError = exception as any;

      if (dbError.code === '23505') {
        status = HttpStatus.BAD_REQUEST;
        code = 400;
        
        if (dbError.detail?.includes('taxCode') || dbError.detail?.includes('username')) {
          message = 'Mã số thuế hoặc tài khoản đăng nhập này đã tồn tại trên hệ thống!';
        } else {
          message = 'Dữ liệu nhập vào bị trùng lặp, vui lòng kiểm tra lại!';
        }
      } else {
        message = exception.message;
      }
    }

    response.status(status).json({
      success: false, 
      code: code,
      message: message,
      data: null,
    });
  }
}