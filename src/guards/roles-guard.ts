import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import axios from 'axios'
@Injectable()
export class RolesGuard implements CanActivate {
  axios: any
  constructor() {
    this.axios = axios
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRequest: Request | any = context.switchToHttp().getRequest();
    const cookie = getRequest.headers.cookie
    const originalUrl = getRequest.originalUrl;
    const whiteList = ['/login'];
    // whiteList.includes(originalUrl)
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
    if (sessionId) throw new UnauthorizedException();
    const user = await this.axios({
      url: 'http://manage.yunlsp.com/unified/api/user/info',
      params: {
        sessionId,
      },
    })
    console.log(user)
    return false
  }
}
