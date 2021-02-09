# source-map-diff

![ci](https://github.com/dylang/source-map-diff/workflows/CI/badge.svg)
[![NPM version][npm-image]][npm-url]

> Compare current sourcemap to the previous to understand why it changed in size.

<img src="screenshots/cli.png" width="585">

## Install

```
$ yarn add source-map-diff
```

## API

<img src="screenshots/html.png" width="496">

### sourceMapDiffAsHtml({ previousSrc, currentSrc }): Promise<string>

Returns a `Promise` for HTML output that can be put on a web page. Classnames are included but not styling.


### sourceMapDiffForConsole({ previousSrc, currentSrc })

Returns a `Promise` for color console output.

### sourceMapDiff({ previousSrc, currentSrc })

Returns a `Promise` for a `SourcemapDiff`.

## Command-line usage

<img src="screenshots/json.png" width="653">

```bash
$ source-map-diff --previousSrc <filename-or-url> --currentSrc <filename-or-url>
```

Optional
`--format html` to get the output as an HTML string.
`--format json` to get the output as JSON.



## Related

- [source-map-explorer](https://github.com/danvk/source-map-explorer) - Create a visualization from the sourcemap. Source-map-diff uses this library to parse the source maps.

[npm-url]: https://www.npmjs.com/package/source-map-diff
[npm-image]: https://img.shields.io/npm/v/source-map-diff.svg
