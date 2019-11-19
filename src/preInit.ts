import { INestApplication, HttpException, Injectable, Inject } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as amqp from 'amqplib/callback_api'
import { env } from './until/env-unit'
import { LoggerExtService } from "./services/entities/logger-service"
@Injectable()
export class PreInit {
  amqp: any = amqp
  channelSendToQueue: any
  queue: string = 'guest'
  constructor(
    @Inject(LoggerExtService) private readonly loggerExtService: LoggerExtService
  ) {
    this.Initialization()
  }
  Initialization() {
    this.amqp.connect(env('NEST_RABBITMQ'), this.createChannel.bind(this))
  }
  createChannel(error0, connection) {
    if (error0) {
      setTimeout(() => this.Initialization(), 0)
      throw new HttpException({ error: '连接rabbit失败' }, 500)
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        setTimeout(() => this.Initialization(), 0)
        throw new HttpException({ error: '连接rabbit失败' }, 500)
      }
      const { queue } = this
      channel.assertQueue(queue, {
        durable: false,
      })
      channel.consume(queue, this.channelConsume.bind(this), {
        noAck: true,
      })
      this.channelSendToQueue = channel.sendToQueue.bind(channel)
      global["rabbitMqSend"] = channel.sendToQueue.bind(channel)
      this.rabSendToQueue("我是你爸爸")
    })
  }
  async channelConsume(ctn: any) {
    const msg = ctn.content.toString()
    const data = await this.loggerExtService.findAll()
    console.log(' [x] Received %s', JSON.parse(msg), data)
  }
  rabSendToQueue(msg) {
    this.channelSendToQueue(this.queue, Buffer.from(JSON.stringify(msg)))
  }
  generatorSwagger(app: INestApplication) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('nestjs')
      .setDescription('The logger API description')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('cats')
      .build()
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('swagger', app, swaggerDoc)
  }
}
