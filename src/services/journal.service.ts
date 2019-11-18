import {Injectable} from '@nestjs/common'
import {RabbitMqMicroService} from './microService/rabbitmq-server'
@Injectable()
export class JournalExtService {
	constructor(private readonly rabbitMqMicroService: RabbitMqMicroService) {}
	rabbitService() {
		this.rabbitMqMicroService.amqpConnectCreateChannel()
	}
}
