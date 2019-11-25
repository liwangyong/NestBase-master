import { Logger } from '@nestjs/common';
import { Incorrect } from '../constants/incorrect-constants'
import { LoggerExtService } from './entities/logger-service'

export class MyLogger extends Logger {
  constructor(
    private readonly loggerExtService: LoggerExtService,
  ) {
    super()
  }
  error(msg: string, trace: string) {
    const error = this.defaultReturn(msg)
    this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Error'] }, error))
  }
  log(msg: string) {
    const log = this.defaultReturn(msg)
    this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Info'] }, log))
  }
  warn(msg: string) {
    const warn = this.defaultReturn(msg)
    this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Warning'] }, warn))
  }
  debug(msg: string) {
    const debug = this.defaultReturn(msg)
    this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Debug'] }, debug))
  }
  defaultReturn(content: string) {
    return {
      createdTime: new Date().getTime(),
      url: 'hostMachine',
      operator: 'host',
      content,
    }
  }
}
