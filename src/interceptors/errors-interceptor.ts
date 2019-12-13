import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpCode } from './../constants/http-constants';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus()
    response.status(200).json({
      code: status || 500,
      content: exception.message.error || HttpCode[status || 500],
      message: 'error',
    });
  }
}
