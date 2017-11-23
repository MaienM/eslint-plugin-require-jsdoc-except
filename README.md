# eslint-plugin-require-jsdoc-except

This is a modified version of the built-in eslint rule [require-jsdoc](https://eslint.org/docs/rules/require-jsdoc) that
allows you to exclude certain methods from requiring a JSDoc.

The rationale is that when using a framework such as React, there will be certain recurring method about which no useful
docs can be made. There is no real point in describing each render method as "Renders the component", and any more than
that will often just be a duplication of the component's JSDoc.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-promise`:

```
npm install eslint-plugin-require-jsdoc-except --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-promise` globally.

## Usage

Add `require-jsdoc-with-exception` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
	"plugins": [
		"require-jsdoc-with-exception"
	]
}
```

Then configure the rule. The main usage is as the built-in eslint rule
[require-jsdoc](https://eslint.org/docs/rules/require-jsdoc). In addition, this plugin adds a second option to the
option object: `ignore`. This accepts a list of names for which the JSDoc requirement should not be enforced.

The following example would require all named functions to be documented, except for class constructors (or other
functions named constructor).

``` json
{
	"require-jsdoc-except/require": ["error", {
		"require": {
			"FunctionDeclaration": true,
			"MethodDefinition": true,
			"ClassDeclaration": true,
			"ArrowFunctionExpression": true,
			"FunctionExpression": true
		},
		"ignore": ["constructor"]
	}]
}
```

