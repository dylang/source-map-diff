# source-map-diff

![ci](https://github.com/dylang/source-map-diff/workflows/CI/badge.svg)
[![NPM version][npm-image]][npm-url]
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![ESM](https://img.shields.io/badge/ESM-supported-brightgreen.svg)](https://nodejs.org/api/esm.html)

> Compare current sourcemap to the previous to understand why it changed in size.

A powerful tool that helps you analyze JavaScript bundle size changes by comparing source maps.

* Input can be local filenames or URLs to JavaScript files online
* Output can be HTML, JSON, or colorized command line text
* Full TypeScript support and ESM compatibility

<img src="screenshots/cli.png" width="585">

## Installation

```bash
# Using npm
npm install source-map-diff

# Using yarn
yarn add source-map-diff
```

## Examples

```typescript
import {
  sourceMapDiff,
  sourceMapDiffAsHtml,
  sourceMapDiffForConsole
} from 'source-map-diff';

// Basic comparison returning structured data
async function compareBuilds() {
  const result = await sourceMapDiff({
    previousSrc: './dist/previous-build.js',
    currentSrc: './dist/current-build.js'
  });

  console.log('Total files changed:', result.length);
}

// Generate HTML output
async function generateHtmlReport() {
  const html = await sourceMapDiffAsHtml({
    previousSrc: 'https://example.com/previous.js',
    currentSrc: './dist/current.js'
  });

  // Write to file or insert into a webpage
  console.log(html);
}

// Console output with colors
async function logToConsole() {
  const output = await sourceMapDiffForConsole({
    previousSrc: './dist/v1.0.0.js',
    currentSrc: './dist/v1.1.0.js'
  });

  // Already formatted with colors for terminal display
  console.log(output);
}
```

## API

<img src="screenshots/html.png" width="496">

### sourceMapDiffAsHtml({ previousSrc, currentSrc }): Promise<string>

Returns a `Promise` for HTML output that can be put on a web page. Classnames are included but not styling.

```typescript
import { sourceMapDiffAsHtml } from 'source-map-diff';

const html = await sourceMapDiffAsHtml({
  previousSrc: './dist/bundle.v1.js',
  currentSrc: './dist/bundle.v2.js'
});
```

### sourceMapDiffForConsole({ previousSrc, currentSrc }): Promise<string>

Returns a `Promise` for color console output.

```typescript
import { sourceMapDiffForConsole } from 'source-map-diff';

const consoleOutput = await sourceMapDiffForConsole({
  previousSrc: 'https://mysite.com/v1/main.js',
  currentSrc: 'https://mysite.com/v2/main.js'
});

console.log(consoleOutput);
```

### sourceMapDiff({ previousSrc, currentSrc }): Promise<Array<FileSizeComparison>>

Returns a `Promise` for structured data you can use for custom reporting:

```typescript
import { sourceMapDiff } from 'source-map-diff';

// Type of the returned data
interface FileSizeComparison {
  filename: string;
  added: boolean;    // File was not in the previous bundle
  removed: boolean;  // File was removed from the current bundle
  isIncreased: boolean; // File grew in size
  isDecreased: boolean; // File decreased in size
  isSame: boolean;      // File did not change size
  previousSize: number; // Byte count in previous bundle
  currentSize: number;  // Byte count in current bundle
  changeInSize: number; // Change in bytes
}

// Example usage
const result = await sourceMapDiff({
  previousSrc: './old.js',
  currentSrc: './new.js'
});

// Find files with the biggest increases
const increases = result
  .filter(item => item.isIncreased)
  .sort((a, b) => b.changeInSize - a.changeInSize);

console.table(increases);
```

## Command-line usage

<img src="screenshots/json.png" width="653">

Basic usage:

```bash
# Compare local files
npx source-map-diff --previousSrc ./dist/old.js --currentSrc ./dist/new.js

# Compare with URLs
npx source-map-diff \
  --previousSrc https://mysite.com/v1/bundle.js \
  --currentSrc https://mysite.com/v2/bundle.js
```

### Output formats

```bash
# HTML output (useful for reports)
npx source-map-diff --previousSrc <file> --currentSrc <file> --format html > report.html

# JSON output (useful for further processing)
npx source-map-diff --previousSrc <file> --currentSrc <file> --format json > changes.json

# Default console output with colors
npx source-map-diff --previousSrc <file> --currentSrc <file>
```

## Use Cases

- **CI/CD Pipelines**: Add bundle size tracking to your CI process
- **Pull Request Reviews**: Analyze bundle size impact before merging code
- **Dependency Updates**: Understand the impact of dependency upgrades
- **Bundle Optimization**: Identify opportunities for code splitting and tree-shaking
- **Technical Debt**: Track growing modules that need refactoring

## Notes

* Size is always uncompressed bytes in the bundle, not size of the original source code.
* Bundlers often add helper functions and references to chunks/functions in other bundles, but don't include this data in the source map. We use "[generated]" to represent that code.
* You can compare any two bundles, even from different websites. Compare your JS to a competitor's site and see what dependencies you have in common.

## Related

- [source-map-explorer](https://github.com/danvk/source-map-explorer) - Create a visualization from the sourcemap. Source-map-diff uses this library to parse the source maps.

[npm-url]: https://www.npmjs.com/package/source-map-diff
[npm-image]: https://img.shields.io/npm/v/source-map-diff.svg
