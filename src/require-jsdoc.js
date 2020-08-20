const baseRule = require('eslint/lib/rules/require-jsdoc');
const assignIn = require('lodash.assignin');
const get = require('lodash.get');

const REGEX_STRING = /^\/(.*)\/([a-z]*)$/;

module.exports = {
	meta: {
		docs: {
			description: 'require JSDoc comments, with exceptions',
			category: "Stylistic Issues",
			recommended: false,
		},

		schema: [{
			properties: {
				ignore: {
					type: 'array',
					items: {
						type: 'string',
						format: 'regex',
					},
				},
			},
		}],

		messages: {
			missingJSDocComment: "Missing JSDoc comment."
		}
	},

	create(context) {
		// Get the ignorelist
		const ignoreList = (context.options[0] && context.options[0].ignore || [])
			.map((ign) => {
				// If possible, convert to regexp objects
				const match = REGEX_STRING.exec(ign);
				return match ? RegExp.apply(RegExp, match.slice(1)) : ign;
			});

		// Create instance of the base rule
		const base = baseRule.create(assignIn({}, context, {
			options: context.options.map((opt) => Object.assign({}, opt, { ignore: undefined })),
		}));

		/**
		 * Find the name of the declared node, if any.
		 */
		function getName(node) {
			switch (node.parent.type) {
				case 'AssignmentExpression':
					return node.parent.right === node && get(node, 'parent.left.property.name');

				case 'ClassProperty':
				case 'Property':
				case 'MethodDefinition':
					return get(node, 'parent.key.name');

				case 'VariableDeclarator':
					return get(node, 'parent.id.name');

				default:
					return get(node, 'id.name');
			}
		}

		/**
		 * Checks the name of the node to see if JSDoc validation should occur for this node.
		 *
		 * If the name is defined and in the ignored list, return false, and skip the normal JSDoc validation.
		 */
		function shouldCheck(node) {
			const name = getName(node);
			return !name || !ignoreList.find((ign) => (ign.test ? ign.test(name) : ign === name));
		}

		return {
			FunctionDeclaration(node) {
				if (shouldCheck(node)) {
					base.FunctionDeclaration(node);
				}
			},
			FunctionExpression(node) {
				if (shouldCheck(node)) {
					base.FunctionExpression(node);
				}
			},
			ClassDeclaration(node) {
				if (shouldCheck(node)) {
					base.ClassDeclaration(node);
				}
			},
			ArrowFunctionExpression(node) {
				if (shouldCheck(node)) {
					base.ArrowFunctionExpression(node);
				}
			}
		};
	}
};

