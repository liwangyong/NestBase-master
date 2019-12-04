import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { accessToPrivate } from '../until/private-information'
@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRequest: Request | any = context.switchToHttp().getRequest();
    const cookie = getRequest.headers.cookie
    const originalUrl = getRequest.originalUrl;
    const whiteList = ['/login'];
    if ([].includes.call(whiteList, originalUrl)) {
      return true
    }
    // 取出cookie
    let sessionId: string = '';
    [].some.call(cookie.split(';'), item => {
      const fixed = item.split('=')
      if (fixed[0] === 'sessionId') {
        sessionId = fixed[1]
        return true
      }
    })
    if (!Boolean(sessionId)) throw new UnauthorizedException();
    const { data } = await accessToPrivate(sessionId)
    if (!Boolean(data.data)) {
      throw new UnauthorizedException();
    }
    return false
  }
}
