import { Module, Global } from '@nestjs/common';
import { MyLogger } from '../services/nest-logger-service';
@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class NestLoggerModule { }
