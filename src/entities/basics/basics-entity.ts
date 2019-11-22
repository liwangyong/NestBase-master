import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert} from 'typeorm'

/**
 * 基础实体，扩展创建时间、更新时间和软删除支持
 */
export class BasicEntity extends BaseEntity {
	@CreateDateColumn()
	setDataTime: Date
	@UpdateDateColumn()
	updateTime: Date

	@Column({type: 'bool', comment: '是否已删除', default: false})
	deleted: boolean
}
