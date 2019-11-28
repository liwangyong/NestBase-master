import { Controller, Get, Inject, Post, Body, UsePipes, Query } from '@nestjs/common'
import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { ResultSend } from '../dto/result-dto'
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { JournalValidationPipe } from './pipe/default-pipe'
@ApiUseTags('登录/退出')
@Controller('login')
export class LoginController {
  constructor(
  ) { }
  @Post('/')
  @ApiOperation({ title: '登录' })
  @ApiOkResponse({ description: '登录成功/失败', type: ResultSend })
  @UsePipes(new JournalValidationPipe())
  async login(@Body() req: LoginServiceDto): Promise<ResultSend> {
    return { code: 200, message: '', content: '' }
  }
}
