import {IsInt, Min, Max, IsDate} from 'class-validator'
import {Type} from 'class-transformer'
import {ApiModelProperty} from '@nestjs/swagger'
export class JournalServiceDto {
	@ApiModelProperty({description: '日志等级', example: '1'})
	@Type(() => String)
	readonly level: string
	@ApiModelProperty({description: '生成时间', example: new Date().getTime()})
	@IsDate()
	readonly createdTime: Date
	@ApiModelProperty({description: '错误地址/接口', example: 'www.text.com'})
	@Type(() => String)
	readonly url: string
	@ApiModelProperty({description: '错误执行人', example: 'session'})
	@Type(() => String)
	readonly operator: string
	@ApiModelProperty({description: '错误内容', example: '错误'})
	@Type(() => String)
	readonly content: string
}
