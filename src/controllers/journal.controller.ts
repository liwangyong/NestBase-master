import {Controller, Get, Inject, Post, Body} from '@nestjs/common'
import {ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitBody} from '@nestjs/swagger'
import {LoggerExtService} from '../services/entities/logger-service'
import {ResultSend} from '../dto/result-dto'
import {JournalArrayServiceDto} from '../dto/service-dto/journal-dto'
import {JournalExtService} from '../services/journal.service'
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
	async sendJournal(@Body() req: JournalArrayServiceDto): Promise<ResultSend> {
        // rabbit 发送
		this.journalExtService.rabbitService(req.data)
		return {code: 200, message: 'success', content: null}
	}
}
