/* istanbul ignore file */
/* eslint-disable import/no-commonjs */

const path = require('path');
const { existsSync } = require('fs');

// Use these instead of the numbers. Never use warnings.
const DISABLED = 0;
const ENABLED = 'error';

// Learn more about our rules in our docs:
// https://pacific.medallia.com/display/CAFE/ESLint+Rules
// If you need to ignore a rule use // eslint-disable-next-line <rule name>
module.exports = {
    root: true,
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        project: [
            existsSync(path.join(process.cwd(), 'tsconfig.eslint.json'))
                ? path.join(process.cwd(), 'tsconfig.eslint.json')
                : path.join(process.cwd(), 'tsconfig.json')
        ],
        tsconfigRootDir: process.cwd()
        // ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        // sourceType: 'module', // Allows for the use of imports
    },
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    plugins: [
        // https://github.com/sindresorhus/eslint-plugin-unicorn
        'unicorn',
        // https://www.npmjs.com/package/eslint-plugin-promise
        'promise',
        // https://github.com/yannickcr/eslint-plugin-import
        'import',
        // https://github.com/facebook/jest/tree/master/packages/eslint-plugin-jest
        'jest',
        // https://prettier.io/docs/en/eslint.html
        'prettier',
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        // Super helpful but slow on repos with tons of packages. See notes at top of this file.
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier'
    ],
    rules: {
        // We let prettier handle formatting because eslint has issues with formatting types.
        // https://github.com/eslint/eslint/issues/10117
        // https://github.com/eslint/typescript-eslint-parser/issues/458
        'prettier/prettier': [
            ENABLED,
            {
                parser: 'typescript'
            }
        ],

        // Prettier does not decide when to use curly braces, just how they should be indented.
        curly: ENABLED,
        // Can't use `indent` and `indent-legacy` at the same time
        'indent-legacy': DISABLED,
        // Too much work to fix
        // okay to have camel_case properties, helpful for graphql
        camelcase: DISABLED,
        // Allow React components and @Decorator to start with capital letter
        'new-cap': DISABLED,
        // Golden Rule: If you can use a Stateless Functional Component, then do so.
        // http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components
        // use import, not require
        'import/no-commonjs': ENABLED,
        // Disabling this rule because it is slow
        'import/extensions': DISABLED,
        // one line blank line after imports
        'import/newline-after-import': ENABLED,
        // import statements must be before all other code
        'import/first': ENABLED,
        // All dependencies must be in the package.json
        'import/no-extraneous-dependencies': [
            ENABLED,
            { devDependencies: ['**/*test*', '**/demo/**', '/*.config.js'] }
        ],
        // We're fine with `return resolve();` because we often need to return after calling resolve() anyway.
        'no-promise-executor-return': DISABLED,
        // We're fine with decimals with higher precision than JavaScript allows because then we can mock the same values express gives us.
        'no-loss-of-precision': DISABLED,
        // Allow for: 'ComponentName.test.js' instead of 'component-name.test.js'
        'unicorn/filename-case': DISABLED,
        // Enables using eslint-disable at the top of a file to ignore the whole file.
        // useful for development and quick prototypes.
        'unicorn/no-abusive-eslint-disable': DISABLED,
        // Allow `array.from()` instead of forcing spread operator.
        'unicorn/prefer-spread': DISABLED,
        'unicorn/catch-error-name': DISABLED,
        // Too aggressive.
        'unicorn/prevent-abbreviations': DISABLED,
        // Not compatible with IE/Edge.
        'unicorn/prefer-dom-node-append': DISABLED,
        'unicorn/prefer-dom-node-remove': DISABLED,
        // Alternative can be less readable.
        'unicorn/no-unreadable-array-destructuring': DISABLED,
        // Allow for todo comments
        'unicorn/expiring-todo-comments': DISABLED,
        // Not important.
        'unicorn/prefer-optional-catch-binding': DISABLED,
        // Null is fine.
        'unicorn/no-null': DISABLED,
        // Reduce is fine.
        'unicorn/no-array-reduce': DISABLED,
        // helpful for typescript
        'unicorn/no-useless-undefined': DISABLED,
        // not supported in IE
        'unicorn/prefer-number-properties': DISABLED,
        // Nested is fine
        'unicorn/no-nested-ternary': DISABLED,
        // Too crazy
        'unicorn/consistent-function-scoping': DISABLED,
        // Breaks old IE support.
        'unicorn/prefer-modern-dom-apis': DISABLED,
        // Bug in the rule, once fixed bring back: https://github.com/sindresorhus/eslint-plugin-unicorn/issues/477
        'unicorn/better-regex': DISABLED,
        // Set/has slower for small arrays
        'unicorn/prefer-set-has': DISABLED,
        // Too strict for us
        'unicorn/no-object-as-default-parameter': DISABLED,
        // Not important enough for the work to fix (no auto-fix).
        'unicorn/import-style': DISABLED,
        'no-warning-comments': DISABLED,
        // Too aggressive
        'unicorn/consistent-destructuring': DISABLED,
        // Doesn't help readability
        'unicorn/no-array-for-each': DISABLED,
        // Breaks stream.push(); https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1057
        'unicorn/no-array-push-push': DISABLED,
        // Allow un-capitalized comments
        'capitalized-comments': DISABLED,
        // Good: { ...abc}, Bad: Object.assign({}, abc)
        'prefer-spread': ENABLED,
        // Allow debugger statements when working locally
        'no-debugger': ENABLED,
        // Sort imports, absolute first then relative
        'import/order': [
            ENABLED,
            { groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index'] }
        ],
        // Sort the individual imported methods, ie: import { a, B, c } from '...';
        'sort-imports': [
            ENABLED,
            {
                ignoreDeclarationSort: true, // Must be true or it will conflict with `import/order` above which is more powerful.
                ignoreCase: false, // Capitalized props will be first.
                ignoreMemberSort: false // Must be false this rule to run.
            }
        ],
        // Don't import from the same module more than once.
        'no-duplicate-imports': ENABLED,
        // Poorly written rule just looks for `await`, so `return promise;` incorrectly fails.
        'require-await': DISABLED,
        // ESlint spends 68% of the time on just this rule, so disabling.
        // Test with: `rm -rf .cache && TIMING=1 yarn lint`
        // Rule                                                   |  Time (ms) | Relative
        // :------------------------------------------------------|-----------:|--------:
        // require-atomic-updates                                 | 147742.294 |    68.7%
        // indent                                                 |  11847.444 |     5.5%
        // import/extensions                                      |  11695.409 |     5.4%
        // max-len                                                |   2144.051 |     1.0%
        // no-extra-parens                                        |   1737.166 |     0.8%
        'require-atomic-updates': DISABLED,

        // Not useful enough
        'default-param-last': DISABLED,
        'function-call-argument-newline': DISABLED,

        // This breaks enzyme tests
        'unicorn/no-array-callback-reference': DISABLED,

        // one empty line between class properties and methods
        'lines-between-class-members': [ENABLED, 'always', { exceptAfterSingleLine: true }],
        'getter-return': DISABLED,
        complexity: [ENABLED, { max: 30 }],
        'array-element-newline': DISABLED,
        'func-names': DISABLED,

        // Broken rules
        'no-useless-rename': DISABLED,

        // don't require return types
        '@typescript-eslint/explicit-module-boundary-types': DISABLED,
        '@typescript-eslint/camelcase': DISABLED,
        '@typescript-eslint/explicit-member-accessibility': [
            ENABLED,
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit'
                }
            }
        ],
        // handled by prettier
        '@typescript-eslint/indent': DISABLED,
        // handled by prettier
        '@typescript-eslint/member-delimiter-style': DISABLED,
        '@typescript-eslint/no-inferrable-types': DISABLED,
        // It thinks imported types are unused
        '@typescript-eslint/no-unused-vars': ENABLED,
        // handled by import rules
        '@typescript-eslint/no-var-requires': DISABLED,
        '@typescript-eslint/consistent-type-assertions': [
            ENABLED,
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }
        ],
        '@typescript-eslint/prefer-namespace-keyword': ENABLED,
        // handled by prettier
        '@typescript-eslint/type-annotation-spacing': DISABLED,

        // Throws an error for TypeScript files.
        'no-useless-constructor': DISABLED,
        'no-unused-expressions': DISABLED,
        '@typescript-eslint/no-unused-expressions': DISABLED,

        // Extra parens are helpful for casting, such as
        // (moduleName as jest.Mock).mockReturnValue(...);
        'no-extra-parens': DISABLED,

        // This is helpful to show that a function is async.
        '@typescript-eslint/require-await': DISABLED,
        // Small perf gain but lots of code changes and might be harder for humans to read.
        '@typescript-eslint/prefer-regexp-exec': DISABLED,
        // We use this as a noop.
        '@typescript-eslint/no-empty-function': DISABLED,
        // Too many to fix, and not usually horrible if undefined gets through.
        '@typescript-eslint/restrict-template-expressions': DISABLED,
        // Too many to fix, and a lot of work to type every `catch err`.
        '@typescript-eslint/no-unsafe-member-access': DISABLED,
        // Too much work.
        '@typescript-eslint/explicit-function-return-type': DISABLED,
        '@typescript-eslint/ban-ts-comment': [
            ENABLED,
            {
                'ts-expect-error': false, // Use this!
                'ts-ignore': true, // Use @ts-expect-error, not @ts-ignore
                'ts-nocheck': true,
                'ts-check': false
            }
        ],
        // Ban types that are used incorrectly.
        '@typescript-eslint/ban-types': [
            ENABLED,
            {
                // Start with the defaults from
                // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
                extendDefaults: true,
                // Change recommendation from `Record<string, unknown>` to `{ [key: string]: unknown } or JsonValue`
                types: {
                    Object: [
                        'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
                        '- If you want a type meaning "any object", you might use `{ [key: string]: unknown }` or JsonValue from type-fest instead.',
                        '- If you want a type meaning "any value", you might want to try `unknown` instead.'
                    ].join('\n'),
                    '{}': [
                        '`{}` actually means "any non-nullish value".',
                        '- It does not mean unknown object.',
                        '- It does not mean empty object.',
                        '- If you want a type meaning "any object", you might use `{ [key: string]: unknown }` or JsonValue from type-fest.',
                        '- If you want a type meaning "any value", you might want to try `unknown`.'
                    ].join('\n'),
                    object: [
                        'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
                        '- If you are using this with <Generic extends object> then add // eslint-disable-next-line @typescript-eslint/ban-types -- object is useful for extends.',
                        '- If you want a type meaning "any object", you might use `{ [key: string]: unknown }` or JsonValue from type-fest.',
                        '- If you want a type meaning "any value", you might want to try `unknown`.'
                    ].join('\n')
                }
            }
        ],

        // These require TypeChecking to be enabled which greatly slows down ESLint as every file
        // must be run through TypeScript.
        // Make sure we don't forget to `await` promises. This can easily happen in functional tests.
        '@typescript-eslint/no-floating-promises': [ENABLED, { ignoreVoid: false, ignoreIIFE: true }],

        // We may check for mis-used promises in the near future.
        '@typescript-eslint/no-misused-promises': [
            ENABLED,
            {
                // It's okay for event listeners which don't expect promises to have async listeners.
                checksVoidReturn: true,
                // For useEffect hooks.
                ignoreIIFE: true
            }
        ],

        // The return value of every JSON.parse, got, require(variable), await import,
        // Object.assign, and more should typed, otherwise TypeScript assumes they are `any`,
        // essentially disabling any typing with that return value.
        '@typescript-eslint/no-unsafe-assignment': DISABLED
    },
    overrides: [
        // =====================================================================================
        // JS ONLY
        // =====================================================================================
        {
            files: ['**/*.js'],
            extends: [],
            env: {
                jest: true
            },
            globals: {
                jsdom: true
            },
            rules: {
                // Enforce good Jest practices
                'jest/no-disabled-tests': ENABLED,
                'jest/no-focused-tests': ENABLED,
                'jest/consistent-test-it': [ENABLED, { fn: 'test' }],
                'jest/valid-describe': ENABLED,
                'jest/no-jasmine-globals': ENABLED,
                'jest/no-large-snapshots': [ENABLED, { maxSize: 60 }],
                'jest/no-test-prefixes': ENABLED,
                'jest/no-test-return-statement': ENABLED,
                'jest/prefer-to-be-null': ENABLED,
                'jest/prefer-to-be-undefined': ENABLED,
                'jest/prefer-to-contain': ENABLED,
                'jest/require-top-level-describe': ENABLED,

                // We frequently comment out tests blocked by other teams
                'jest/no-commented-out-tests': DISABLED,
                // Enabling prefer-spy-on would be nice but it broke a lot of tests because
                // we add mocks to methods not provided by JSDOM like performance.
                // 'jest/prefer-spy-on': ENABLED,

                'unicorn/error-message': DISABLED,
                'prefer-promise-reject-errors': DISABLED,

                // just for tests?
                // mocks can return any
                '@typescript-eslint/no-unsafe-return': DISABLED,
                '@typescript-eslint/no-unsafe-assignment': DISABLED,
                '@typescript-eslint/no-unsafe-member-access': DISABLED,

                // Not important when mocking for tests
                '@typescript-eslint/explicit-member-accessibility': DISABLED,

                // needed for .toBeCalledWith
                '@typescript-eslint/unbound-method': DISABLED,
                // Easier to write tests
                '@typescript-eslint/ban-types': DISABLED,
                '@typescript-eslint/no-unsafe-call': DISABLED,

                // This makes it harder to match exact strings.
                'jest-dom/prefer-to-have-text-content': DISABLED,
                // Makes it harder to test that there is just one of an item.
                'jest-dom/prefer-in-document': DISABLED
            }
        },

        // =====================================================================================
        // JEST TESTS ONLY
        // =====================================================================================
        {
            files: [
                '**/*.test.?(disabled.)[jt]s?(x)',
                '**/*.spec.[jt]s?(x)',
                '**/demo/**/*.[jt]s?(x)',
                '**/demo-sandbox/**/*.[jt]s?(x)',
                '**/__mocks__/**/*.[jt]s?(x)',
                '**/fixtures/**/*.[jt]s?(x)'
            ],
            extends: ['plugin:jest/recommended'],
            env: {
                jest: true
            },
            globals: {
                jsdom: true
            },
            rules: {
                // Enforce good Jest practices
                'jest/no-disabled-tests': ENABLED,
                'jest/no-focused-tests': ENABLED,
                'jest/consistent-test-it': [ENABLED, { fn: 'test' }],
                'jest/valid-describe': ENABLED,
                'jest/no-jasmine-globals': ENABLED,
                'jest/no-large-snapshots': [ENABLED, { maxSize: 60 }],
                'jest/no-test-prefixes': ENABLED,
                'jest/no-test-return-statement': ENABLED,
                'jest/prefer-to-be-null': ENABLED,
                'jest/prefer-to-be-undefined': ENABLED,
                'jest/prefer-to-contain': ENABLED,
                'jest/require-top-level-describe': ENABLED,

                // We frequently comment out tests blocked by other teams
                'jest/no-commented-out-tests': DISABLED,
                // Enabling prefer-spy-on would be nice but it broke a lot of tests because
                // we add mocks to methods not provided by JSDOM like performance.
                // 'jest/prefer-spy-on': ENABLED,

                'unicorn/error-message': DISABLED,
                'prefer-promise-reject-errors': DISABLED,

                // just for tests?
                // mocks can return any
                '@typescript-eslint/no-unsafe-return': DISABLED,
                '@typescript-eslint/no-unsafe-assignment': DISABLED,
                '@typescript-eslint/no-unsafe-member-access': DISABLED,

                // Not important when mocking for tests
                '@typescript-eslint/explicit-member-accessibility': DISABLED,

                // needed for .toBeCalledWith
                '@typescript-eslint/unbound-method': DISABLED,
                // Easier to write tests
                '@typescript-eslint/ban-types': DISABLED,
                '@typescript-eslint/no-unsafe-call': DISABLED,

                // This makes it harder to match exact strings.
                'jest-dom/prefer-to-have-text-content': DISABLED,
                // Makes it harder to test that there is just one of an item.
                'jest-dom/prefer-in-document': DISABLED
            }
        }
    ],

    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/cache': {
            lifetime: 30 * 60 * 1000 // 30 minutes
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.jsx', '.tsx']
            },
            typescript: {
                // always try to resolve types under `<root/>@types` directory even it doesn't contain any source code. See https://www.npmjs.com/package/eslint-import-resolver-typescript and https://github.com/alexgorbatchev/eslint-import-resolver-typescript
                // help import/no-unresolved identify implicit dependency path, e.g. type-fest, jquery for @types/jquery
                alwaysTryTypes: true
            }
        }
    }
};
