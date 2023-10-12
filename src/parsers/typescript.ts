import { type ParserOptions } from 'prettier'
import * as prettierPluginTypescript from 'prettier/plugins/typescript'
import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'
import jsxAttributes from '../node-formatters/jsx-attributes'
import twin from '../node-formatters/twin'
import { CreateSortClassList, type Options } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'

export default (cscl: CreateSortClassList) => ({
	...prettierPluginTypescript.parsers.typescript,
	async parse(text: string, options: ParserOptions & Options) {
		const ast = await prettierPluginTypescript.parsers.typescript.parse(
			text,
			options
		)

		const attributeNames: string[] =
			options.sortClassNamesClassAttributes.split(',')
		const functionNames: string[] =
			options.sortClassNamesSortFunctions.split(',')

		return loopNodes(ast, node => {
			jsxAttributes(cscl(options), node, attributeNames)
			twin(cscl(options), node)
			functionCalls(cscl(options), node, functionNames)
			functionTemplates(cscl(options), node, functionNames)

			return node
		})
	},
})
