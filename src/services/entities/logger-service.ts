import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {LoggerExtEntity} from '../../entities/logger-entity'
@Injectable()
export class LoggerExtService {
	constructor(
		@InjectRepository(LoggerExtEntity)
		private readonly loggerExtEntity: Repository<LoggerExtEntity>,
	) {}
	findAll(argsSearch?: any): Promise<LoggerExtEntity[]> {
		return this.loggerExtEntity.find()
	}
	findOne(argsSearch: any = {}): Promise<LoggerExtEntity> {
		return this.loggerExtEntity.findOne(argsSearch)
	}
	/**
	 * 根据记录Uuid（主键）查找日志
	 * @param uuid 日志Uuid（主键）
	 */
	async findByUuid(uuid: string): Promise<LoggerExtEntity> {
		return await this.loggerExtEntity.findOne({uuid})
	}
}
