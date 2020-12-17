import { CreateSortClassList, SortClassList } from '../sort-class-list'
import babel from './babel'
import css from './css'
import html from './html'
import typescript from './typescript'

export default (cscl: CreateSortClassList) => ({
	html: html(cscl),
	css: css(cscl),
	babel: babel(cscl),
	typescript: typescript(cscl),
})
