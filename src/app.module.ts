import { Module } from '@nestjs/common'
import { Connection } from 'typeorm'
import { ConfigModule } from 'nestjs-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { EntityModule } from './modules/entity/logger.module'
import { LoggerExtEntity } from './entities/logger-entity'
import { JournalModule } from './modules/journal.module'
import { PreInit } from "./preInit"
// 注意，这里路径要指向存放配置文件的config文件夹
@Module({
  imports: [
    EntityModule,
    JournalModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nestjs', // 数据库名称
      entities: [LoggerExtEntity], // 表集合
      synchronize: true,
    }),
    ConfigModule.load(path.resolve(__dirname, './', 'config', '**/!(*.d).{ts,js}')),
  ],
  controllers: [],
  providers: [PreInit],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
