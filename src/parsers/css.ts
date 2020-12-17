import prettierParserPostCSS from 'prettier/parser-postcss'
import { CreateSortClassList, SortClassList } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'

export default (cscl: CreateSortClassList) => ({
	...prettierParserPostCSS.parsers.css,
	parse(text, parsers, options) {
		const ast = prettierParserPostCSS.parsers.css.parse(text, parsers, options)

		const result = loopNodes(ast, node => {
			if (
				node &&
				node.type === 'css-atrule' &&
				node.name === 'apply' &&
				node.params
			) {
				const newValue = cscl(options)(node.params).join(' ')

				node.params = newValue
			}

			return node
		})

		return result
	},
})
