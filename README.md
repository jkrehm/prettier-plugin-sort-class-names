# prettier-plugin-sort-class-names

Per default it will sort your class names alphabetically.

## install

Prettier should already be set up for your project ([check prettier docs](https://prettier.io/docs/en/install.html)). After that it is enough to install `prettier-plugin-sort-class-names` in the same project, it will be applied automatically.

```
npm i prettier-plugin-sort-class-names --save-dev
# or with yarn
yarn add prettier-plugin-sort-class-names --dev
```

## prettier-plugin-sort-class-names-order

You can create a file `prettier-plugin-sort-class-names-order` where every line represents a class name. The higher up a class is in the list, the further forward it is sorted. Example:

```
flex
block
align-items-center
```

With this sorting-file, a node like 

```html
<div class="custom-class md:flex align-items-center block"></div>
``` 

will become 

```html
<div class="custom-class / block align-items-center md:flex"></div>
```

### existing order-lists

- [tailwind with default config](https://gist.github.com/PutziSan/e5c1edcdaa540d8104f8e38712eca472#file-prettier-plugin-sort-class-names-order)

## custom prettier options

you can add this options to your [prettier config file](https://prettier.io/docs/en/configuration.html):

| option                                | description                                                                                                                                                                             | default                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| sortClassNamesOrderFile               | Path to your custom `prettier-plugin-sort-class-names-order` file, if you not define anything, it will sort the class names alphabetically.                                             | `"prettier-plugin-sort-class-names-order"` |
| sortClassNamesPrefixes                | comma seperated list of your prefixes. Prefixes will be grouped together wenn sorting.                                                                                                  | `"sm:,md:,lg:,xl:"`                        |
| sortClassNamesUnknownClassesSeparator | When your class list contains known (in your order-file) and unknown class names, it will be separated by this char. You can disable this by providing an empty string as option (`""`) | `"/"`                                      |
| sortClassNamesClassAttributes         | Comma separated list of JSX attributes to sort tailwind classes in.                                                                                                                     | `"class,className,tw"`                     |
| sortClassNamesSortFunctions           | Comma separated list of function names to sort classes in arguments.                                                                                                                    | `"clsx,classNames,cx"`                     |

## special thanks

To [Acidic9](https://github.com/Acidic9) and his package [prettier-plugin-tailwind](https://github.com/Acidic9/prettier-plugin-tailwind).

If you want to sort your tailwind class names, you should give this package a shot and come back if you want to extend it with custom class names.
