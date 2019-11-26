import {ApiModelProperty} from '@nestjs/swagger'
import {IsInt, Min, Max} from 'class-validator'

/**
 * 分页请求DTO基类
 */
export class PagingReqDto {
	@ApiModelProperty({description: '分页页码  count > 0'})
	@IsInt({message: '页码必须是整数'})
	@Min(1, {message: '页码不得小于0'})
	readonly pageIndex: number

	@ApiModelProperty({description: '分页每页数量 5 < count <100'})
	@IsInt({message: '每页数量必须是整数'})
	@Min(5, {message: '每页数量不得小于5'})
	@Max(100, {message: '每页数量不得大于100'})
	readonly pageSize: number
}
