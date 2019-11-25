import { Injectable } from '@nestjs/common';
import { LoggerExtService } from '../services/entities/logger-service'
import { RabbitMqMicroService } from '../services/microService/rabbitmq-server';
import { JournalServiceDto } from '../dto/service-dto/journal-dto';
import { ResultSend } from '../dto/result-dto';
import { PagePullOuting, PageResultSend } from '../dto/service-dto/journal-get-dto'
import { SortType } from '../constants/incorrect-constants'
@Injectable()
export class JournalExtService {
  constructor(
    private readonly rabbitMqMicroService: RabbitMqMicroService,
    private readonly loggerExtService: LoggerExtService,
  ) { }
  async rabbitService(data: JournalServiceDto[]): Promise<ResultSend> {
    if (data instanceof Array) {
      try {
        this.rabbitMqMicroService.rabSendToQueue(data);
        return { code: 200, message: 'success', content: null };
      } catch (Err) {
        throw {
          code: 400,
          message: 'error',
          content: null,
        };
      }
    }
  }
  async getScreeningData(query: PagePullOuting): Promise<PageResultSend> {
    const { pageIndex, pageSize, screening } = query
    const obj = {
      take: Number(pageSize),
      skip: (pageIndex - 1) * pageSize,
      where: screening,
      order: { createdTime: SortType['ASC'] }
    }
    try {
      const [content, total] = await this.loggerExtService.pagingQueryMany(obj)
      return { code: 200, message: 'success', content, total }
    } catch (err) {
      throw {
        code: 400,
        message: 'error',
        content: null,
        total: 0,
      }
    }
  }
}
