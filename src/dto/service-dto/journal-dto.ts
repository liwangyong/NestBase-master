import { IsString, IsArray, ValidateNested, ArrayMinSize, IsInstance, IsInt, IsNotEmpty, IsFQDN} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
export class JournalServiceDto {
  @ApiModelProperty({ description: '日志等级', example: '1' })
  @IsString({message: '必须是字符串'})
  @IsNotEmpty({message: '等级不为空'})
  readonly level: string;
  @ApiModelProperty({ description: '生成时间', example: new Date().getTime() })
  @IsNotEmpty({message: '生成时间不为空'})
  @IsInt()
  readonly createdTime: number;
  @ApiModelProperty({ description: '错误地址/接口', example: 'www.text.com' })
  @IsFQDN()
  @IsNotEmpty()
  readonly url: string;
  @ApiModelProperty({ description: '错误执行人', example: 'session' })
  @IsString()
  @IsNotEmpty()
  readonly operator: string;
  @ApiModelProperty({ description: '错误内容', example: '错误' })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
export class JournalArrayServiceDto {
  @ApiModelProperty({
    description: '错误内容数组集合, length > 0',
    type: [JournalServiceDto],
  })
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => JournalServiceDto)
  @IsNotEmpty()
  @ArrayMinSize(1, {message: '日志提交最起码一条'})
  @IsInstance(JournalServiceDto, {each: true})
  readonly data: JournalServiceDto[];
}
