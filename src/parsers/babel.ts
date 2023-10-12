import { type ParserOptions } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'
import jsxAttributes from '../node-formatters/jsx-attributes'
import { CreateSortClassList, type Options } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'

export default (cscl: CreateSortClassList) => ({
	...prettierPluginBabel.parsers.babel,
	async parse(text: string, options: ParserOptions & Options) {
		const ast = await prettierPluginBabel.parsers.babel.parse(text, options)

		const attributeNames: string[] =
			options.sortClassNamesClassAttributes.split(',')
		const functionNames: string[] =
			options.sortClassNamesSortFunctions.split(',')

		return loopNodes(ast, node => {
			jsxAttributes(cscl(options), node, attributeNames)
			functionCalls(cscl(options), node, functionNames)
			functionTemplates(cscl(options), node, functionNames)

			return node
		})
	},
})
