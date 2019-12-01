import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './until/env-unit'
import { PreInit } from './preInit'
import { Loggers } from './services/logger-service'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Loggers()
  })
  PreInit.prototype.generatorMiddle(app)
  await app.listen(env('NEST_PORT') || 4000)
  console.info(`\x1B[32m${env('NEST_PORT') || 4000} Nest Project begin\x1B[0m`)
}
bootstrap()
