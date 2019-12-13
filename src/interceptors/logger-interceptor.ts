import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, timeout, catchError } from 'rxjs/operators';
import { green, yellow } from 'colors';
import { Loggers } from '../services/logger-service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('Loggers') private readonly loggers: Loggers,
  ) {}
  /**
   * 记录输出
   * @date 2019-11-30
   * @param {any} context:返回体
   * @param {any} next:CallHandlr
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest()
    const now = Date.now();
    return next
      .handle()
      .pipe(
        timeout(5000),
        tap(() => console.log(`${green('[Nest Response]')} - ${new Date().toLocaleString()}- ${yellow('[Router]')} ${green(url + '/' + method)} ${yellow(String(Date.now() - now) + 'ms')}`)),
        catchError((err) => {
          this.loggers.error('请求失败', err)
          return throwError(err)
        })
      );
  }
}