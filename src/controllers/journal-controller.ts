import { Controller, Get, Post, Body, UsePipes, Query, Headers} from '@nestjs/common'
import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { ResultSend } from '../dto/result-dto'
import { JournalArrayServiceDto } from '../dto/service-dto/journal-dto'
import { JournalExtService } from '../services/journal.service'
import { JournalValidationPipe } from './pipe/default-pipe'
import { PagePullOuting, PageResultSend } from '../dto/service-dto/journal-get-dto'
@ApiUseTags('journal 日志请求接口')
@Controller('/journal')
export class JournalController {
  constructor(
    private readonly journalExtService: JournalExtService,
  ) { }
  @ApiOperation({ title: '发送日志' })
  @ApiOkResponse({ description: '回调成功/失败', type: ResultSend })
  @UsePipes(new JournalValidationPipe())
  @Post('/upload')
  async sendJournal(@Body() req: JournalArrayServiceDto): Promise<ResultSend> {
    return await this.journalExtService.rabbitService(req.data)
  }

  @ApiOperation({ title: '获取日志' })
  @ApiOkResponse({ description: '获取到符合条件的日志内容', type: ResultSend })
  @UsePipes(new JournalValidationPipe())
  @Get('/obtain')
  async getJournalAnMany(@Query() query: PagePullOuting): Promise<PageResultSend> {
    return await this.journalExtService.getScreeningData(query)
  }
}
