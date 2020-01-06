import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Connection } from 'typeorm';
import { RolesGuard } from './guards/roles-guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from './interceptors/logger-interceptor';
import { EntityModule } from './modules/entity/logger.module';
import { LoggerExtEntity } from './entities/logger-entity';
import { JournalModule } from './modules/journal.module';
import { LoggersModules } from './modules/logger-module';
import { LoggerSubscriber } from './entities/subscriber/logger-subscriber';
import { HttpExceptionFilter } from './interceptors/errors-interceptor';
import { ScheduleModules } from './modules/schedule-module';
import { LoginModule } from './modules/login-model';
import { env } from './until/env-unit';
@Module({
  imports: [
    EntityModule,
    LoggersModules,
    ScheduleModules,
    JournalModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: env('NEST_LIBRARY'),
      host: env('NEST_LIBRARY_HOST'),
      port: Number(env('NEST_LIBRARY_HOST')),
      username: env('NEST_USERNAME'),
      password: env('NEST_PASSWORD'),
      database: env('NEST_DATABASE'), // 数据库名称
      entities: [LoggerExtEntity], // 表集合
      subscribers: [LoggerSubscriber],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
