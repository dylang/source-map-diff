# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start the CLI tool with ts-node (for development)
pnpm start
```

### Build

```bash
# Build the project (outputs to ./lib)
```

### Testing

```bash
# Run all tests and linting
pnpm test

# Run specific test file
pnpm test path/to/test-file.test.ts

# Run linting
pnpm lint

# Format code
pnpm format
```

## Project Structure

Source Map Diff is a utility that compares JavaScript source maps to understand why a bundle's size changed. It can analyze sourcemaps from local files or web URLs and provides output in HTML, JSON, or console formats.

### Architecture

The project has a modular architecture with these key components:

1. **CLI Interface** (`src/cli/`) - Handles command-line arguments and outputs results
2. **Source Map Loading** (`src/load-source-map/`) - Loads source maps from filesystem or web URLs
3. **File Size Comparison** (`src/compare-file-sizes/`) - Compares file sizes between two source maps
4. **Tree Generation** (`src/generate-tree/`) - Converts comparison data into tree visualizations
5. **Core Module** (`src/source-map-diff.ts`) - Orchestrates the process and exposes the main API

### Core Workflow

1. Load source maps from provided locations (local files or URLs)
2. Parse the source maps to extract file sizes
3. Compare file sizes between the two source maps
4. Generate a tree visualization of the differences
5. Output the results in the requested format (HTML, JSON, or console)

### API Functions

- `sourceMapDiff({ currentSrc, previousSrc })` - Returns raw comparison data
- `sourceMapDiffAsHtml({ currentSrc, previousSrc })` - Returns HTML visualization
- `sourceMapDiffForConsole({ currentSrc, previousSrc })` - Returns console-friendly output

## Usage Examples

### CLI Usage

```bash
# Compare two local source maps
pnpm run start --previousSrc path/to/old-file.js --currentSrc path/to/new-file.js

# Compare with HTML output format
pnpm run start --previousSrc path/to/old-file.js --currentSrc path/to/new-file.js --format html

# Compare with JSON output format
pnpm run start --previousSrc path/to/old-file.js --currentSrc path/to/new-file.js --format json
```

### API Usage

```typescript
import { sourceMapDiff, sourceMapDiffAsHtml, sourceMapDiffForConsole } from 'source-map-diff';

// Get raw comparison data
const data = await sourceMapDiff({ previousSrc: 'path/to/old-file.js', currentSrc: 'path/to/new-file.js' });

// Get HTML output
const html = await sourceMapDiffAsHtml({ previousSrc: 'path/to/old-file.js', currentSrc: 'path/to/new-file.js' });

// Get console-friendly output
const consoleOutput = await sourceMapDiffForConsole({ previousSrc: 'path/to/old-file.js', currentSrc: 'path/to/new-file.js' });
```
