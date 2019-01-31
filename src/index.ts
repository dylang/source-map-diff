// import * as path from 'path';
export {generateTree} from './generate-tree';
export {sourceMapDiff} from './source-map-diff';
import {sourceMapDiff} from './source-map-diff';

const demo = async () => {
    const results = await sourceMapDiff({
        // currentSrc: 'https://cdn.medallia.com/reporting-application/PR-6800/main.js', // main.js', //satisfaction-src.min.js',
        // previousSrc: 'https://cdn.medallia.com/reporting-application/4.93.2-pre-c1ff9cc-20190125170048/main.js', // main.js', //satisfaction-src.min.js',
        // currentSrc: '/Users/dgreene/medallia/reporting/build/district1/reporting-application/main.js',

        // currentSrc: 'https://cdn.medallia.com/reporting-application/PR-5550/main.js',
        // previousSrc: 'https://cdn.medallia.com/reporting-application/4.91.0-pre-01bf4f0-20181017053215/main.js',

        // currentSrc: path.join(process.cwd(), 'examples/example-2.js'),
        // previousSrc: path.join(process.cwd(), 'examples/example-3.js'),
        // currentSrc: 'https://progressivetooling.com/bundle.7d66e.js',
        // currentSrc: 'https://spectrum.chat/static/js/main.568c8ba0.js',
        // previousSrc: 'https://cdn.vox-cdn.com/packs/chorus-85e79d8870de02973b56.js',
        generateAnsiTree: true,
        generateHtmlTree: true,
        currentSrc: 'https://www.nytimes.com/vi-assets/static-assets/vendor-11fa1f4c6466c5986bb6.js',
        previousSrc: 'https://www.nytimes.com/vi-assets/static-assets/vendor-7500f19ab24902203a6c.js'
        // 'https://www.nytimes.com/vi-assets/static-assets/main-91d2535e408af89ac72e.js',
        // 'https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js',
        // 'https://assets-cdn.github.com/assets/github-f6e5f43b2c596ec20a37b5ff7ae371ab.js'
        // path.join(process.cwd(), 'examples/example-3.js')
    });

    console.log(results.ansi);
    console.log('------------------------');
    console.log(results.html);
};

demo().catch(err => console.error(err));
