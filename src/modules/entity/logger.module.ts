import {Module, Global} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {LoggerExtEntity} from '../../entities/logger-entity'
import {LoggerExtService} from '../../services/entities/logger-service'
@Global()
@Module({
	imports: [TypeOrmModule.forFeature([LoggerExtEntity])],
	providers: [LoggerExtService],
	exports: [LoggerExtService],
})
export class EntityModule {}
