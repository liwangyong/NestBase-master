import {Controller, Get, Inject, Post, Body, UsePipes} from '@nestjs/common'
import {ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitBody} from '@nestjs/swagger'
import {LoggerExtService} from '../services/entities/logger-service'
import {ResultSend} from '../dto/result-dto'
import {JournalArrayServiceDto} from '../dto/service-dto/journal-dto'
import {JournalExtService} from '../services/journal.service'
import { JournalValidationPipe } from './pipe/journal-pipe'
@ApiUseTags('journal 日志请求接口')
@Controller('journal')
export class JournalController {
	constructor(
		@Inject(LoggerExtService) private readonly loggerExtService: LoggerExtService,
		@Inject(JournalExtService) private readonly journalExtService: JournalExtService,
	) {}
	@ApiOperation({title: '发送日志'})
	@ApiOkResponse({description: '回调成功/失败', type: ResultSend})
    @Post('/upload')
    @UsePipes(new JournalValidationPipe())
	async sendJournal(@Body() req: JournalArrayServiceDto): Promise<ResultSend> {
        // rabbit 发送
		return await this.journalExtService.rabbitService(req.data)
    }
    @Get('obtain')
    async getJournalAnMany(): Promise<any> {
        return {code: 200, message: 'success', content: null}
    }
}
