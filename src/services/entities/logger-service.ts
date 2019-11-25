import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerExtEntity } from '../../entities/logger-entity';
import { JournalServiceDto } from '../../dto/service-dto/journal-dto';
@Injectable()
export class LoggerExtService {
  constructor(
    @InjectRepository(LoggerExtEntity)
    private readonly loggerExtEntity: Repository<LoggerExtEntity>,
  ) { }
  findAll(argsSearch?: any): Promise<LoggerExtEntity[]> {
    return this.loggerExtEntity.find();
  }
  findOne(argsSearch: any = {}): Promise<LoggerExtEntity> {
    return this.loggerExtEntity.findOne(argsSearch);
  }
  /**
   * 根据记录Uuid（主键）查找日志
   * @param uuid 日志Uuid（主键）
   */
  async findByUuid(uuid: string): Promise<LoggerExtEntity> {
    return await this.loggerExtEntity.findOne({ uuid });
  }
  /**
   * 批量insert数据
   * @bulkData uuid 日志Uuid（主键）
   */
  batchEventInsert(bulkData: JournalServiceDto[]) {
    return this.loggerExtEntity
      .createQueryBuilder()
      .insert()
      .into(LoggerExtEntity)
      .values(bulkData)
      .execute();
  }
  /**
   * where AND count
   * @query 分页及筛选条件
   */
  async pagingQueryMany(query): Promise<any> {
    return await this.loggerExtEntity.findAndCount({
      ...query,
    })
  }
}
