import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {env} from './until/env-unit'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn'],
	})
	app.enableCors()
	const options = new DocumentBuilder()
		.setTitle('李王墉接口')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addBearerAuth()
		.addTag('cats')
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('swagger', app, document)
	await app.listen(env('NEST_PORT') || 4000)
}
bootstrap()
