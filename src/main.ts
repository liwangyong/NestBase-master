import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './until/env-unit'
// import {Transport} from '@nestjs/microservices'
import { PreInit } from './preInit'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  app.enableCors()
  PreInit.prototype.generatorSwagger(app)
  await app.startAllMicroservicesAsync()
  await app.listen(env('NEST_PORT') || 4000)
}
bootstrap()
