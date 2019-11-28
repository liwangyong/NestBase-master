import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Connection } from 'typeorm';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpsModule } from './modules/http-module'
import { EntityModule } from './modules/entity/logger.module';
import { LoggerExtEntity } from './entities/logger-entity';
import { JournalModule } from './modules/journal.module';
import { NestLoggerModule } from './modules/nest-logger-module'
import { LoggerSubscriber } from './entities/subscriber/logger-subscriber';
import { HttpExceptionFilter } from './interceptors/errors.interceptor'
import { ScheduleModules } from './modules/schedule-module'
import { LoginModule } from './modules/login-model'
import { env } from './until/env-unit';
@Module({
  imports: [
    EntityModule,
    ScheduleModules,
    JournalModule,
    LoginModule,
    HttpsModule,
    NestLoggerModule,
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
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
