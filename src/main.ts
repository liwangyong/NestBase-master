import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {env} from './until/env-unit'
// import {Transport} from '@nestjs/microservices'
import {PreInit} from './preInit'
async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn'],
	})
	app.enableCors()
	new PreInit().generatorSwagger(app)
	// app.connectMicroservice({
	// 	transport: Transport.RMQ,
	// 	options: {
	// 		urls: [`amqp://localhost:5672`],
	// 		queue: 'guest',
	// 		queueOptions: {durable: false},
	// 	},
	// })
	await app.startAllMicroservicesAsync()
	await app.listen(env('NEST_PORT') || 4000)
}
bootstrap()
