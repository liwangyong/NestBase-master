import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class LoginServiceDto {
  @ApiModelProperty({ description: '账号', example: '123' })
  @IsString()
  @IsNotEmpty()
  account: string
  @ApiModelProperty({ description: '账号密码', example: '123' })
  @IsNotEmpty()
  password: string | number
}
