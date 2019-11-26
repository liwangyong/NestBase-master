import { Logger } from '@nestjs/common';
import { Incorrect } from '../constants/incorrect-constants'
import { LoggerExtService } from './entities/logger-service'
import { writeFilePromise } from '../until/logger-json-unit'
import { JournalServiceDto } from '../dto/service-dto/journal-dto'

export class MyLogger extends Logger {
  constructor(
    private readonly loggerExtService: LoggerExtService,
  ) {
    super()
  }
  error(msg: string, trace: string) {
    const error = this.defaultReturn(msg)
    console.info(`\x1B[31m${msg}\x1B[0m`)
    this.insertEventSave(Object.assign({ level: Incorrect['Error'] }, error))
  }
  log(msg: string) {
    const log = this.defaultReturn(msg)
    console.info(`\x1B[2m${msg}\x1B[0m`)
    this.insertEventSave(Object.assign({ level: Incorrect['Info'] }, log))
  }
  warn(msg: string) {
    const warn = this.defaultReturn(msg)
    console.info(`\x1B[33m${msg}\x1B[0m`)
    this.insertEventSave(Object.assign({ level: Incorrect['Warning'] }, warn))
  }
  debug(msg: string) {
    const debug = this.defaultReturn(msg)
    console.info(`\x1B[37m${msg}\x1B[0m`)
    this.insertEventSave(Object.assign({ level: Incorrect['Debug'] }, debug))
  }
  defaultReturn(content: string) {
    return {
      createdTime: new Date().getTime(),
      url: 'http://localhost:4000/',
      operator: 'host',
      content,
    }
  }
  async insertEventSave(data: JournalServiceDto) {
    try {
      await this.loggerExtService.nestLoggerSave(data)
    } catch (err) {
      writeFilePromise([data])
    }
  }
}
