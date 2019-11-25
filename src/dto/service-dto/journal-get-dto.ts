import { PagingReqDto } from '../paging-dto'
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ResultSend } from '../result-dto'
export class PagePullOuting extends PagingReqDto {
  @ApiModelProperty({ required: false, description: '筛选条件'})
  screening
}
export class PageResultSend extends ResultSend {
  @ApiModelPropertyOptional()
  @ApiModelProperty({ description: '总数', example: 0 })
  total: number
}
