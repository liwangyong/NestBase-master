import { env } from './env-unit'
import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs'
import { JournalServiceDto } from '../dto/service-dto/journal-dto'
const path: string = resolve(__dirname, `../loggers/${env('NODE_ENV')}.json`)
export const readResult = (): JournalServiceDto[] => JSON.parse(readFileSync(path, 'utf8'))

export const writeFilePromise = (data: JournalServiceDto[]) => {
  const k = JSON.stringify(readResult().concat(data), null, 4)
  writeFileSync(path, k)
}

export const writeFileClean = () => {
  const k = JSON.stringify([], null, 4)
  writeFileSync(path, k)
}
