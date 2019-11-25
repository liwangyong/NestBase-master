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
    return this.loggerExtEntity.find(argsSearch);
  }
  /**
   * 批量insert数据
   * @bulkData 批量数据
   */
  async batchEventInsert(bulkData: JournalServiceDto[]): Promise<any> {
    return await this.loggerExtEntity
      .createQueryBuilder()
      .insert()
      .into(LoggerExtEntity)
      .values(bulkData)
      .execute();
  }
  /**
   * nestjs 内部 logger 存储
   * @data data
   */
  async nestLoggerSave(data: JournalServiceDto): Promise<any> {
    return await this.loggerExtEntity.save(data)
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
