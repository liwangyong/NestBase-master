import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './until/env-unit'
import { PreInit } from './preInit'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  })
  app.enableCors()
  PreInit.prototype.generatorSwagger(app)
  await app.startAllMicroservicesAsync()
  await app.listen(env('NEST_PORT') || 4000)
  console.info(`${env('NEST_PORT') || 4000} Nest Project begin`)
}
bootstrap()
