import { Injectable } from '@nestjs/common';
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { ResultSend } from '../dto/result-dto';
@Injectable()
export class LoginService {
  constructor() { }
  async loginVerification(req: LoginServiceDto): Promise<ResultSend> {
    return { code: 200, message: '', content: '' }
  }
}