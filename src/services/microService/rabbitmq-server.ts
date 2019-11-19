import * as amqp from 'amqplib'
import {Injectable} from '@nestjs/common'
import {defaultSelfInfo} from '../../convertConfig/ambient'
import {JournalArrayServiceDto} from '../../dto/service-dto/journal-dto'
@Injectable()
export class RabbitMqMicroService {
	amqp: any = amqp
	conn: any
	constructor() {}
	amqpConnectCreateChannel(info: JournalArrayServiceDto) {
		defaultSelfInfo(async data => {
			const conn = await this.amqp.connect(data.rabbitmq.url)
			this.sendToQueue = await conn.createChannel()
		})
	}
	sendToQueue() {}
}
