try {
    module.exports = require("eslint/lib/testers/rule-tester"); // ESLint 4.x and 5.x.
} catch {
    module.exports = require("eslint/lib/rule-tester").RuleTester; // ESLint 6.x.
}
