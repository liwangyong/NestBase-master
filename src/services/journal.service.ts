import { Injectable, HttpException } from '@nestjs/common';
import { RabbitMqMicroService } from '../services/microService/rabbitmq-server';
import { JournalServiceDto } from '../dto/service-dto/journal-dto';
import { ResultSend } from '../dto/result-dto';
@Injectable()
export class JournalExtService {
  constructor(private readonly rabbitMqMicroService: RabbitMqMicroService) {}
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
}
