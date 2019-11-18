import * as amqp from 'amqplib/callback_api'
import {readFileSync} from 'fs'
import {join} from 'path'
import {env} from '../../until/env-unit'
import {Inject, Injectable} from '@nestjs/common'
import {defaultSelfInfo} from '../../convertConfig/ambient'
@Injectable()
export class RabbitMqMicroService {
	amqp: any = amqp
	constructor() {}
	amqpConnectCreateChannel() {
		console.log(defaultSelfInfo())
	}
}
