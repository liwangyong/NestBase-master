import { HttpException, Injectable, Inject } from '@nestjs/common';
import { JournalArrayServiceDto } from '../../dto/service-dto/journal-dto';
import * as amqp from 'amqplib/callback_api';
import { env } from '../../until/env-unit';
import { ConfigService } from 'nestjs-config';
import { LoggerExtService } from '../../services/entities/logger-service';
@Injectable()
export class RabbitMqServer {
    amqp: ConfigService = amqp;
    channelSendToQueue: any;
    queue: string = 'guest';
    constructor(
        @Inject(LoggerExtService)
        private readonly loggerExtService: LoggerExtService,
    ) {}
    onModuleInit() {
        this.Initialization();
    }
    // 连接
    Initialization() {
        this.amqp.connect(env('NEST_RABBITMQ'), this.createChannel.bind(this));
    }
    // 连接回调
    createChannel(j, connection) {
        if (j) {
        setTimeout(() => this.Initialization(), 300);
        throw new HttpException({ error: '连接rabbit失败' }, 500);
        }
        connection.createChannel((k, channel) => {
        if (k) {
            setTimeout(() => this.Initialization(), 300);
            throw new HttpException({ error: '连接rabbit失败' }, 500);
        }
        const { queue } = this;
        channel.assertQueue(queue, {
            durable: false,
        });
        channel.consume(queue, this.channelConsume.bind(this), {
            noAck: true,
        });
        this.channelSendToQueue = channel.sendToQueue.bind(channel);
        global['rabbitMqSend'] = channel.sendToQueue.bind(channel);
        });
    }
    // 监听队列
    async channelConsume(ctn: any) {
        const msg = ctn.content.toString();
        const data = await this.loggerExtService.findAll();
        console.log(' [x] Received %s', JSON.parse(msg), data);
    }
    // 发送队列
    rabSendToQueue(msg: JournalArrayServiceDto) {
        this.channelSendToQueue(this.queue, Buffer.from(JSON.stringify(msg)));
    }
}
