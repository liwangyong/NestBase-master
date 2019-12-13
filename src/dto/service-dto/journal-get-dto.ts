import { PagingReqDto } from '../paging-dto'
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { ResultSend } from '../result-dto'
import { IsString, IsInt, IsFQDN, ValidateIf} from 'class-validator';
export class PagePullOuting extends PagingReqDto {
  @ApiModelProperty({ description: '日志等级', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsString()
  readonly level: string;
  @ApiModelProperty({ description: '生成时间', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsInt()
  readonly createdTime: number;
  @ApiModelProperty({ description: '错误地址/接口', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsFQDN()
  readonly url: string;
  @ApiModelProperty({ description: '错误执行人', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsString()
  readonly operator: string;
  @ApiModelProperty({ description: '错误内容', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsString()
  readonly content: string;
  @ApiModelProperty({ description: '初始时间', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsInt()
  startTime: number
  @ApiModelProperty({ description: '结束时间', required: false})
  @ValidateIf((body, item) => Boolean(item))
  @IsInt()
  endTime: number
}
export class PageResultSend extends ResultSend {
  @ApiModelPropertyOptional()
  @ApiModelProperty({ description: '总数', example: 0 })
  total: number
}
