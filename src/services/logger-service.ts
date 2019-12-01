import { LoggerService, Injectable } from '@nestjs/common';
import * as log4js from 'log4js'
@Injectable()
export class Loggers implements LoggerService {
  private readonly loggerErr: log4js.Logger
  private readonly loggerInfo: log4js.Logger
  constructor() {
    this.loggerErr = log4js.getLogger('error')
    this.loggerInfo = log4js.getLogger('info')
  }
  log(message: string) {
    this.loggerInfo.info(message)
  }
  error(message: string, trace?: string) {
    this.loggerErr.error(message, trace)
  }
  warn(message: string, trace?: string) {
    this.loggerErr.error(message, trace)
  }
}