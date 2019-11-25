import { Logger } from '@nestjs/common';
import { LoggerExtService } from './entities/logger-service'

export class MyLogger extends Logger {
  constructor(
    private readonly loggerExtService: LoggerExtService,
  ) {
    super()
  }
  error(message: string, trace: string) {
  }
  log(message: string) { }
  warn(message: string) { }
  debug(message: string) { }
  verbose(message: string) { }
}
