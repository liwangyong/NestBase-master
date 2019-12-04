import { Injectable } from '@nestjs/common';
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { ResultSend } from '../dto/result-dto';
import axios from 'axios'
import { loginPullOut } from '../until/private-information'

@Injectable()
export class LoginService {
  axios: any
  constructor(
  ) {
    this.axios = axios
  }
  async loginVerification(req: LoginServiceDto): Promise<ResultSend> {
    const { account, password } = req
    const res = await loginPullOut(account, password)
    const { msg, success } = res
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
    return { code, message, content }
  }
}
