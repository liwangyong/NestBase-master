import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm'
import {Incorrect} from '../constants/incorrect-constants'
import {BasicEntity} from './basics/basics-entity'
// console.log(typeorm);
@Entity()
export class LoggerExtEntity extends BasicEntity {
	@PrimaryGeneratedColumn('uuid') // 主键
    uuid: string
    @Index()
	@Column({type: 'varchar', comment: '错误等级', default: Incorrect.Info})
    level: string
    @Index()
	@Column({type: 'bigint', comment: '创建时间'})
    createdTime: Date
    @Index()
	@Column({type: 'varchar', comment: '错误地址/接口'})
    url: string
    @Index()
	@Column({type: 'varchar', comment: '操作者'})
	operator: string
	@Column({type: 'varchar', comment: '日志内容'})
	content: string
}
