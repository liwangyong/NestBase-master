import { Injectable } from '@nestjs/common';
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { ResultSend } from '../dto/result-dto';
import { Response } from 'express';
import { accessToPrivate } from '../until/private-information'
import { loginPullOut } from '../until/private-information'

@Injectable()
export class LoginService {
  async loginVerification(reqBody: LoginServiceDto, res: Response): Promise<Response> {
    const { account, password } = reqBody
    try {
      const data = await loginPullOut(account, password)
      const { msg, success } = data
      let code: number = 0
      let message: string = ''
      let content: string | any = ''
      if (success) {
        code = 200
        message = 'success'
      } else {
        code = 400
        message = 'error'
      }
      content = msg
      res.cookie('sessionId', content, {
        maxAge: 86400000, httpOnly: true,
      })
      return res.json({ code, message, content })
    } catch (err) {
      return res.json({ code: 400, message: 'error', content: '登录失败' })
    }
  }
  /**
   * 描述 拉取详细信息
   * @date 2019-12-09
   * @param {string} sessionId:string
   * @returns {ResultSend} 返回实体
   */
  async privateNews(sessionId: string): Promise<ResultSend> {
    try {
      const {data: res} = await accessToPrivate(sessionId)
      const { success, data } = res
      let code: number = 0
      let message: string = ''
      let content: string | any = ''
      if (success) {
        code = 200
        message = 'success'
      } else {
        code = 400
        message = 'error'
      }
      content = data
      return { code, message, content }
    } catch (err) {
      return { code: 400, message: 'error', content: '拉取信息失败' }
    }
  }
}
