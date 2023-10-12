import { type ParserOptions } from 'prettier'
import * as prettierPluginHTML from 'prettier/plugins/html'
import { CreateSortClassList, type Options } from '../sort-class-list'

export default (cscl: CreateSortClassList) => ({
	...prettierPluginHTML.parsers.html,
	async parse(text: string, options: ParserOptions & Options) {
		const ast = await prettierPluginHTML.parsers.html.parse(text, options)

		const cleanElementClasses = el => {
			if (el.attrs) {
				const classAttr = el.attrs.find(attr => attr.name === 'class')
				if (classAttr) {
					const classList = classAttr.value
						.split(' ')
						.map(classItem => classItem.trim())
						.filter(classItem => classItem.length > 0)
					classAttr.value = cscl(options)(classList).join(' ')
				}
			}

			if (el.children && el.children.length > 0) {
				el.children.forEach(childEl => cleanElementClasses(childEl))
			}
		}
		cleanElementClasses(ast)

		return ast
	},
})
