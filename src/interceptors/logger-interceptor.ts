import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, timeout, catchError } from 'rxjs/operators';
import { green, yellow } from 'colors';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest()
    const now = Date.now();
    return next
      .handle()
      .pipe(
        timeout(5000),
        tap(() => console.log(`${green('[Nest Response]')} - ${new Date()}- ${yellow('[Router]')} ${green(url + '/' + method)} ${yellow(String(Date.now() - now) + 'ms')}`)),
        catchError((err) => {
          console.log(err)
          return throwError(err)
        })
      );
  }
}