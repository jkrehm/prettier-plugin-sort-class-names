import options from './options'
import parsers from './parsers'
import { defaultSortClassList } from './sort-class-list'

module.exports = {
	parsers: parsers(defaultSortClassList),
	options,
}
