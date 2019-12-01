import { Module, Global } from '@nestjs/common';
import { Loggers } from './../services/logger-service';
@Global()
@Module({
  imports: [],
  providers: [{
    provide: 'Loggers',
    useClass: Loggers,
  }],
  exports: ['Loggers'],
})
export class LoggersModules {
}
