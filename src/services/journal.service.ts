import { Injectable } from '@nestjs/common';
import { RabbitMqMicroService } from '../services/microService/rabbitmq-server';
import { JournalServiceDto } from '../dto/service-dto/journal-dto'
@Injectable()
export class JournalExtService {
  constructor(private readonly rabbitMqMicroService: RabbitMqMicroService) {}
  rabbitService(data: JournalServiceDto[]) {
        if (data instanceof Array) {
            this.rabbitMqMicroService.rabSendToQueue(data);
        }
  }
}
