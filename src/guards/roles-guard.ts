import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { accessToPrivate } from '../until/private-information'
@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRequest: Request | any = context.switchToHttp().getRequest();
    const cookie = getRequest.headers.cookie
    const originalUrl = getRequest._parsedUrl.pathname;
    const whiteList = ['/login', '/login/info'];
    if ([].includes.call(whiteList, originalUrl)) {
      return true
    }
    // 取出cookie
    let sessionId: string = '7ee7408926c3482db3fb6e849d1af3ce';
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
    return true
  }
}
