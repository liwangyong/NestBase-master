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
    console.info(`\x1B[31m${msg}\x1B[0m`)
    try {
      this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Error'] }, error))
    } catch (err) {}
  }
  log(msg: string) {
    const log = this.defaultReturn(msg)
    console.info(`\x1B[2m${msg}\x1B[0m`)
    try {
      this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Info'] }, log))
    } catch (err) {}
  }
  warn(msg: string) {
    const warn = this.defaultReturn(msg)
    console.info(`\x1B[33m${msg}\x1B[0m`)
    try {
      this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Warning'] }, warn))
    } catch (err) {}
  }
  debug(msg: string) {
    const debug = this.defaultReturn(msg)
    console.info(`\x1B[37m${msg}\x1B[0m`)
    try {
      this.loggerExtService.nestLoggerSave(Object.assign({ level: Incorrect['Debug'] }, debug))
    } catch (err) {}
  }
  defaultReturn(content: string) {
    return {
      createdTime: new Date().getTime(),
      url: 'http://localhost:4000/',
      operator: 'host',
      content,
    }
  }
}
