import { Controller, Get, Post, Body, UsePipes, Query, Res} from '@nestjs/common'
import { ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitQuery } from '@nestjs/swagger'
import { ResultSend } from '../dto/result-dto'
import { Response } from 'express';
import { LoginService } from '../services/login-service'
import { LoginServiceDto } from '../dto/service-dto/login-dto'
import { JournalValidationPipe } from './pipe/default-pipe'
@ApiUseTags('登录/退出')
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) { }
  @Post('/')
  @ApiOperation({ title: '登录' })
  @ApiOkResponse({ description: '登录成功/失败', type: ResultSend })
  @UsePipes(new JournalValidationPipe())
  async login(@Body() reqBody: LoginServiceDto, @Res() res: Response): Promise<Response> {
    return await this.loginService.loginVerification(reqBody, res)
  }
  @Get('/info')
  @ApiImplicitQuery({
    name: 'sessionId',
    description: 'sessionId 拉取详细信息',
    required: true,
    type: String,
  })
  @ApiOperation({ title: '登录拉取详细信息' })
  @ApiOkResponse({ description: '登录拉取详细信息', type: ResultSend })
  @UsePipes(new JournalValidationPipe())
  async apiInfo(@Query() {sessionId}): Promise<ResultSend> {
    return this.loginService.privateNews(sessionId)
  }
}
