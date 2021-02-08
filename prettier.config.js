/* istanbul ignore file */
/* eslint-disable import/no-commonjs */

// https://prettier.io/docs/en/options.html
module.exports = {
    $schema: 'http://json.schemastore.org/prettierrc',
    arrowParens: 'always',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    printWidth: 120,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false,
    overrides: [
        {
            files: '*.{yaml,md,sh}',
            options: {
                tabWidth: 2
            }
        },
        {
            files: '.editorconfig',
            options: { parser: 'yaml' }
        },
        {
            files: '*.json',
            options: {
                printWidth: 80,
                useTabs: true
            }
        }
    ]
};
