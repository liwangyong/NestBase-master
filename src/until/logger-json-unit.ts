import { env } from './env-unit'
import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs'
import { JournalServiceDto } from '../dto/service-dto/journal-dto'
const path: string = resolve(__dirname, `../loggers/${env('NODE_ENV')}.json`)
/**
 * 读取文件夹日志集合
 * @returns {Array} 日志集合
 */
export const readResult = (): JournalServiceDto[] => JSON.parse(readFileSync(path, 'utf8'))

/**
 * 将日志写入 json 文件
 * @date 2019-11-28
 * @param {any} data:JournalServiceDto[]
 * @returns {null} null
 */
export const writeFilePromise = (data: JournalServiceDto[]) => {
  const k = JSON.stringify(readResult().concat(data), null, 4)
  writeFileSync(path, k)
}

/**
 * 清空json文件
 * @returns {null}
 */
export const writeFileClean = () => {
  const k = JSON.stringify([], null, 4)
  writeFileSync(path, k)
}
