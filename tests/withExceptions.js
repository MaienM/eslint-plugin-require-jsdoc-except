'use strict';

const rule = require('../src/require-jsdoc');
const RuleTester = require("./RuleTester");

const options = {
	require: {
		FunctionDeclaration: true,
		FunctionExpression: true,
		MethodDefinition: true,
		ClassDeclaration: true,
		ArrowFunctionExpression: true,
	},
	ignore: ['myFunction'],
};

const ruleTester = new RuleTester();
ruleTester.run('require-jsdoc-except', rule, {
	valid: [
		'var array = [1,2,3]; array.forEach(function() {});',
		'(function(){})();',
		{
			code: 'function myFunction() {}',
			options: [options],
		},
		{
			code: 'var myFunction = function() {};',
			options: [options],
		},
		{
			code: 'Object.myFunction = function () {};',
			options: [options],
		},
		{
			code: 'var obj = { myFunction: function () {} };',
			options: [options],
		},
		{
			code: '/** Class. */ class Cls { myFunction() {} };',
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: '/** Class. */ class Cls { myFunction = () => {} };',
			parser: require.resolve('babel-eslint'),
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: 'var myFunction = () => {};',
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: 'var myFunction = () => () => {};',
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: 'Object.myFunction = () => {};',
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: 'var obj = { myFunction: () => {} };',
			parserOptions: { ecmaVersion: 6 },
			options: [options],
		},
		{
			code: 'function myFunction() {}',
			options: [{
				require: options.require,
				ignore: ['/^my/'],
			}],
		},
		{
			code: 'function myFunction() {}',
			options: [{
				require: options.require,
				ignore: ['/^MY/i'],
			}],
		},
	],

	invalid: [],
});
