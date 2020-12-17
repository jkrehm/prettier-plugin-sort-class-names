import prettierParserBabel from 'prettier/parser-babel'
import functionCalls from '../node-formatters/function-calls'
import functionTemplates from '../node-formatters/function-templates'
import jsxAttributes from '../node-formatters/jsx-attributes'
import { CreateSortClassList, SortClassList } from '../sort-class-list'
import loopNodes from '../utils/loop-nodes'

export default (cscl: CreateSortClassList) => ({
	...prettierParserBabel.parsers.babel,
	parse(text, parsers, options) {
		const ast = prettierParserBabel.parsers.babel.parse(text, parsers, options)

		const attributeNames: string[] = options.sortClassNamesClassAttributes.split(
			','
		)
		const functionNames: string[] = options.sortClassNamesSortFunctions.split(
			','
		)

		const result = loopNodes(ast, node => {
			jsxAttributes(cscl(options), node, attributeNames)
			functionCalls(cscl(options), node, functionNames)
			functionTemplates(cscl(options), node, functionNames)

			return node
		})

		return result
	},
})
