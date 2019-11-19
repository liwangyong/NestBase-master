import {Controller, Get, Inject, Post, Body} from '@nestjs/common'
import {ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitBody} from '@nestjs/swagger'
import {LoggerExtService} from '../services/entities/logger-service'
import {ResultSend} from '../dto/result-dto'
import {JournalServiceDto, JournalArrayServiceDto} from '../dto/service-dto/journal-dto'
import {JournalExtService} from '../services/journal.service'
import {Observable} from 'rxjs'
import {Client, Transport, ClientProxy, MessagePattern, EventPattern} from '@nestjs/microservices'
@ApiUseTags('journal 日志请求接口')
@Controller('journal')
export class JournalController {
	@Client({
		transport: Transport.RMQ,
	})
	client: ClientProxy
	constructor(
		@Inject(LoggerExtService) private readonly loggerExtService: LoggerExtService,
		@Inject(JournalExtService) private readonly journalExtService: JournalExtService,
	) {}
	@ApiOperation({title: '发送日志'})
	@ApiOkResponse({description: '回调成功/失败', type: ResultSend})
	// 策略模式，自定義一個策略名稱amqp
	// @MessagePattern({cmd: 'amqp'})
	@Post()
	async sendJournal(@Body() req: JournalArrayServiceDto): Promise<ResultSend> {
		this.journalExtService.rabbitService()
		// 呼叫使用一個策略，選定amqp
		const pattern = {cmd: 'guest'}
		const data = '111'
		this.client.send<string>(pattern, data).toPromise()
		return {code: 200, message: 'success', content: null}
	}
	@MessagePattern({cmd: 'guest'})
	getMqMessage<T>(data: T): T {
		console.log('aaa', data)
		return data
	}
	@EventPattern('guest')
	async handleUserCreated(data: any) {
		console.log(data)
		// business logic
	}
	async onApplicationBootstrap() {
		// await this.client.connect()
	}
}
