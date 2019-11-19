import {readFile} from 'fs'
import {join} from 'path'
import {env} from '../until/env-unit'
export const defaultSelfInfo = (callback = value => value) => {
	readFile(join(__dirname, `../../config/${env('NODE_ENV')}.json`), 'utf-8', (err, data) => {
		if (err) {
			console.log(err)
		} else {
			callback(JSON.parse(data))
		}
	})
}
