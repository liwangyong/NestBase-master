import { Module } from '@nestjs/common';
import { MyLogger } from '../services/nest-logger-service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule { }
