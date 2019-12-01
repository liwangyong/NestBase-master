import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, timeout, catchError } from 'rxjs/operators';
import { green, yellow } from 'colors';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
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
          console.log(err)
          return throwError(err)
        })
      );
  }
}