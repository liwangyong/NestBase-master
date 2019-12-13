import { Injectable } from '@nestjs/common';
import { LoggerExtService } from '../services/entities/logger-service'
import { RabbitMqMicroService } from '../services/microService/rabbitmq-server';
import { JournalServiceDto } from '../dto/service-dto/journal-dto';
import { ResultSend } from '../dto/result-dto';
import { PagePullOuting, PageResultSend } from '../dto/service-dto/journal-get-dto'
import { SortType } from '../constants/incorrect-constants'
import {Between} from 'typeorm';
@Injectable()
export class JournalExtService {
  constructor(
    private readonly rabbitMqMicroService: RabbitMqMicroService,
    private readonly loggerExtService: LoggerExtService,
  ) { }
  // 发送 rabbit
  async rabbitService(data: JournalServiceDto[]): Promise<ResultSend> {
    if (data instanceof Array) {
      try {
        this.rabbitMqMicroService.rabSendToQueue(data);
        return { code: 200, message: 'success', content: null };
      } catch (Err) {
        throw {
          code: 400,
          message: 'error',
          content: '存储失败',
        };
      }
    }
  }
  async getScreeningData(query: PagePullOuting): Promise<PageResultSend> {
    const { pageIndex, pageSize, ...screening} = query
    const whereTerm = new Object()
    let start = 0
    let end = 0
    if (screening instanceof Object) {
      for (const i in screening) {
        i === 'startTime' && (start = screening[i]);
        i === 'endTime' && (end = screening[i]);
        (i !== 'startTime' && i !== 'endTime') && (whereTerm[i] = screening[i])
      }
    }
    whereTerm['createdTime'] = Between(Number(start), Number(end))
    const obj = {
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
      select: ['uuid', 'content', 'url', 'operator', 'level', 'createdTime'],
      where: Object.assign({ deleted: false }, whereTerm),
      order: { createdTime: SortType['DESC'] },
    }
    try {
      const [content, total] = await this.loggerExtService.pagingQueryMany(obj)
      return { code: 200, message: 'success', content, total }
    } catch (err) {
      throw {
        code: 400,
        message: 'error',
        content: '查询失败',
      }
    }
  }
}
