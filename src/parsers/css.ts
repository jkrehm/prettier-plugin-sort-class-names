import { ParserOptions } from 'prettier'
import * as prettierPluginPostCSS from 'prettier/plugins/postcss'
import { CreateSortClassList, Options } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'

export default (cscl: CreateSortClassList) => ({
	...prettierPluginPostCSS.parsers.css,
	async parse(text: string, options: ParserOptions & Options) {
		const ast = await prettierPluginPostCSS.parsers.css.parse(text, options)

		return loopNodes(ast, node => {
			if (
				node &&
				node.type === 'css-atrule' &&
				node.name === 'apply' &&
				node.params
			) {
				node.params = cscl(options)(node.params).join(' ')
			}

			return node
		})
	},
})
