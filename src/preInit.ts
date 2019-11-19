import {INestApplication, HttpException} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import * as amqp from 'amqplib/callback_api'
import {env} from './until/env-unit'
export class PreInit {
	amqp: any = amqp
	channelSendToQueue: any
	queue: string = 'guest'
	constructor() {
		this.Initialization()
	}
	Initialization() {
		this.amqp.connect(env('NEST_RABBITMQ'), this.createChannel.bind(this))
	}
	createChannel(error0, connection) {
		if (error0) {
			setTimeout(() => this.Initialization(), 0)
			throw new HttpException({error: '连接rabbit失败'}, 500)
		}
		connection.createChannel((error1, channel) => {
			if (error1) {
				setTimeout(() => this.Initialization(), 0)
				throw new HttpException({error: '连接rabbit失败'}, 500)
			}
			const {queue} = this
			channel.assertQueue(queue, {
				durable: false,
			})
			channel.consume(queue, this.channelConsume.bind(this), {
				noAck: true,
			})
			this.channelSendToQueue = channel.sendToQueue.bind(channel)
		})
	}
	channelConsume(ctn: any) {
		const msg = ctn.content.toString()
		console.log(' [x] Received %s', JSON.parse(msg))
	}
	rabSendToQueue(msg) {
		this.channelSendToQueue(this.queue, Buffer.from(msg))
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
