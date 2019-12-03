import { Injectable } from '@nestjs/common';
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { ResultSend } from '../dto/result-dto';
import axios from 'axios'

@Injectable()
export class LoginService {
  axios: any
  constructor(
  ) {
    this.axios = axios
  }
  async loginVerification(req: LoginServiceDto): Promise<ResultSend> {
    const { account, password } = req
    const {data: res} = await this.axios({
      method: 'post',
      url: 'http://manage.yunlsp.com/unified/doLogin',
      params: {
        userName: account,
        password,
      },
    })
    const { msg, data , success } = res
    let code: number = 0
    let message: string = ''
    let content: string | any = ''
    if (success) {
      code = 200
      message = 'success'
      content = {
        userId: msg,
        data,
      }
    } else {
      code = 400
      message = 'error'
      content = msg
    }
    return { code, message, content }
  }
}
