import { HttpException, Injectable, Inject } from '@nestjs/common';
import { JournalServiceDto } from '../../dto/service-dto/journal-dto';
import * as amqp from 'amqplib/callback_api';
import { env } from '../../until/env-unit';
import { ConfigService } from 'nestjs-config';
import { LoggerExtService } from '../../services/entities/logger-service';
import { writeFilePromise } from '../../until/logger-json-unit'
@Injectable()
export class RabbitMqMicroService {
  // amqp 服务
  amqp: ConfigService = amqp;
  // 发送实列方法
  channelSendToQueue: any;
  // 监控队列名
  queue: string = env('NEST_QUEUE');
  // amqp 连接实列
  connection: any
  count: number = 0
  constructor(
    private readonly loggerExtService: LoggerExtService,
  ) { }
  onModuleInit() {
    this.Initialization();
  }
  onModuleDestroy() {
    const { connection } = this
    if (connection) {
      connection.close().then(() => this.connection = null)
    }
  }
  // 连接
  Initialization() {
    this.count ++
    this.amqp.connect(env('NEST_RABBITMQ'), this.createChannel.bind(this));
  }
  // 连接回调
  createChannel(j, connection) {
    if (j) {
      this.count < 4 && setTimeout(() => this.Initialization(), 300);
      console.info(`\x1B[31m连接rabbit失败\x1B[0m`)
    }
    this.connection = connection
    connection.createChannel((k, channel) => {
      if (k) {
        this.count < 4 && setTimeout(() => this.Initialization(), 300);
        console.info(`\x1B[31m连接rabbit失败\x1B[0m`)
      }
      const { queue } = this;
      // woker 挂掉 不要丢掉进程
      channel.assertQueue(queue, {
        durable: true,
      });
      channel.consume(queue, this.channelConsume.bind(this), {
        noAck: true,
      });
      console.info(`\x1B[32mRabbitMq Connect begin\x1B[0m`)
      // 当前实列方法
      this.channelSendToQueue = channel.sendToQueue.bind(channel);
      // 全局方法
      global['rabbitMqSend'] = channel.sendToQueue.bind(channel);
    });
  }
  // 监听队列
  async channelConsume(ctn: any) {
    const msg: string = ctn.content.toString();
    const data: JournalServiceDto[] = JSON.parse(msg)
    if (data instanceof Array) {
      try {
        await this.loggerExtService.batchEventInsert(data)
      } catch (err) {
        writeFilePromise(data)
        console.info(`\x1B[31m队列数据库保存失败${err}\x1B[0m`)
      }
    }
  }
  // 发送队列
  rabSendToQueue(msg: JournalServiceDto[]) {
    // 配置persistent 消息持久化
    this.channelSendToQueue(this.queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
  }
}
