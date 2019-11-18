import {readFileSync} from 'fs'
import {join} from 'path'
import {env} from '../until/env-unit'
export const defaultSelfInfo = () => {
	return readFileSync(join(__dirname, `../../config/${env('NODE_ENV')}.json`))
}
