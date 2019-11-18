import {Controller, Get, Inject, Post, Body} from '@nestjs/common'
import {ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitBody} from '@nestjs/swagger'
import {LoggerExtService} from '../services/entities/logger-service'
import {ResultSend} from '../dto/result-dto'
import {JournalServiceDto} from '../dto/service-dto/journal-dto'
@ApiUseTags('journal 日志请求接口')
@Controller('journal')
export class JournalController {
	constructor(@Inject(LoggerExtService) private readonly loggerExtService: LoggerExtService) {}
	@ApiOperation({title: '发送日志'})
	@ApiOkResponse({description: '回调成功/失败', type: ResultSend})
	@Post()
	async sendJournal(@Body() req: JournalServiceDto): Promise<ResultSend> {
		return {code: 200, message: 'success', content: null}
	}
}
