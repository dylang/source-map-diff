# source-map-diff [![Build Status](https://travis-ci.org/sindresorhus/p-finally.svg?branch=master)](https://travis-ci.org/sindresorhus/p-finally)

> Compare current sourcemap to previous to understand why it grew in size.


## Install

```
$ npm install --save source-map-diff
# or
$ yarn add source-map-diff
```

## Usage

```js
import { sourceMapDiff, generateTree } from 'source-map-diff';

const sourcemapDiff = await sourceMapDiff(filenameOrUrlToCurrentJS, filenameOrUrlToPreviousJS);
const output = generateTree(sourcemapDiff);
```


## API

### sourceMapDiff(filenameOrUrlToCurrentJS, filenameOrUrlToPreviousJS)

Returns a `Promise` for a `SourcemapDiff`.

#### filenameOrUrlToCurrentJS

Type: `String`

Absolute filename or url to the JS file. 
The sourcemap will be automatically found using `# sourceMappingURL=` or appending `.map` to the filename or url.

If the sourcemap cannot be found an exception will be thrown.


### generateTree(sourcemapDiff)

Returns a `Promise` for a `SourcemapDiff`.

#### filenameOrUrlToCurrentJS

Type: `String`

Absolute filename or url to the JS file. 
The sourcemap will be automatically found using `# sourceMappingURL=` or appending `.map` to the filename or url.

If the sourcemap cannot be found an exception will be thrown.


## Related

- [source-map-explorer](https://github.com/sindresorhus/p-try) - `Promise#try()` ponyfill - Starts a promise chain

## License

MIT © [Dylan Greene](https://github.com/dylang)
