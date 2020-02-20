import { Injectable, Inject } from '@nestjs/common';
import { JournalServiceDto } from '../../dto/service-dto/journal-dto';
import * as amqp from 'amqplib';
import { env } from '../../until/env-unit';
import { Loggers } from '../logger-service';
import { LoggerExtService } from '../../services/entities/logger-service';
import { writeFilePromise } from '../../until/logger-json-unit';
@Injectable()
export class RabbitMqMicroService {
  amqbHost: string = env('NEST_RABBITMQ');
  // 监控队列名
  queue: string = env('NEST_QUEUE');
  // amqp 连接实列
  connection: amqp.Connection = null;
  channel: amqp.Channel = null;
  count: number = 0;
  constructor(
    private readonly loggerExtService: LoggerExtService,
    @Inject('Loggers') private readonly loggers: Loggers,
  ) {}
  onModuleInit() {
    this.Initialization();
  }
  onModuleDestroy() {
    this.channel && this.channel.close();
    this.connection && this.connection.close();
  }
  // 连接
  async Initialization() {
    const { queue } = this;
    try {
      this.connection = await amqp.connect(this.amqbHost);
      this.channel = await this.connection.createChannel();
      // durable 消息持久化
      this.channel.assertQueue(queue, { durable: true });
      this.channel.consume(queue, this.channelConsume.bind(this), {
        // 消费了就 清除 要不然就要ack 确认
        noAck: true,
      });
      console.info(`\x1B[32mRabbitMq Connect begin\x1B[0m`);
    } catch (err) {
      console.info(`\x1B[31mRabbitMq Connect Error, ${err}\x1B[0m`);
    }
  }
  // 监听日志队列
  async channelConsume(ctn: any) {
    this.channel.ack(ctn);
    const msg: string = ctn.content.toString();
    const data: JournalServiceDto[] = JSON.parse(msg);
    if (data instanceof Array) {
      try {
        await this.loggerExtService.batchEventInsert(data);
      } catch (err) {
        writeFilePromise(data);
        this.loggers.error('队列数据库保存失败', err);
        console.info(`\x1B[31m队列数据库保存失败${err}\x1B[0m`);
      }
    }
  }
  // 发送队列
  rabSendToQueue(msg: JournalServiceDto[]) {
    // 配置persistent 消息持久化
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(msg)), {
      persistent: false,
    });
  }
}
