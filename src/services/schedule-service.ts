import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { JournalServiceDto } from '../dto/service-dto/journal-dto'
import { readResult, writeFileClean } from '../until/logger-json-unit'
import { LoggerExtService } from './entities/logger-service'
@Injectable()
export class ScheduleService extends NestSchedule {
  constructor(
    private readonly loggerExtService: LoggerExtService,
  ) { super() }
  @Cron('0 0 0 * * *')
  async cronJob() {
    const readData: JournalServiceDto[] = readResult()
    if (readData.length) {
      try {
        await this.loggerExtService.batchEventInsert(readData)
        writeFileClean()
        console.info(`\x1B[31m定时任务存储数据库失败\x1B[0m`)
      } catch (err) { }
    }
  }
}
