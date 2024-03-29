import path from 'path';
import { readFileSync } from 'fs';
import { parseSourceMap } from './parse-source-map';

describe('parse-source-map', () => {
    test('parseSourceMap', async () => {
        const src = readFileSync(path.join(__dirname, '../fixtures/gatsby-app.js'));
        const map = readFileSync(path.join(__dirname, '../fixtures/gatsby-app.js.map'));
        const results = await parseSourceMap({ src, map });
        expect(results).toEqual({
            '(webpack)/buildin/global.js': 131,
            '[EOLs]': 3,
            '[generated]': 9713,
            '[sourceMappingURL]': 38,
            '[unmapped]': 175,
            cache: 681,
            'gatsby-browser.js': 1104,
            'node_modules/@babel/runtime/helpers/arrayLikeToArray.js': 116,
            'node_modules/@babel/runtime/helpers/arrayWithHoles.js': 53,
            'node_modules/@babel/runtime/helpers/arrayWithoutHoles.js': 72,
            'node_modules/@babel/runtime/helpers/assertThisInitialized.js': 133,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js': 141,
            'node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js': 54,
            'node_modules/@babel/runtime/helpers/esm/defineProperty.js': 155,
            'node_modules/@babel/runtime/helpers/esm/extends.js': 242,
            'node_modules/@babel/runtime/helpers/esm/inheritsLoose.js': 130,
            'node_modules/@babel/runtime/helpers/esm/iterableToArray.js': 93,
            'node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js': 167,
            'node_modules/@babel/runtime/helpers/esm/toConsumableArray.js': 52,
            'node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js': 358,
            'node_modules/@babel/runtime/helpers/extends.js': 231,
            'node_modules/@babel/runtime/helpers/inheritsLoose.js': 105,
            'node_modules/@babel/runtime/helpers/interopRequireDefault.js': 61,
            'node_modules/@babel/runtime/helpers/interopRequireWildcard.js': 552,
            'node_modules/@babel/runtime/helpers/iterableToArray.js': 105,
            'node_modules/@babel/runtime/helpers/iterableToArrayLimit.js': 310,
            'node_modules/@babel/runtime/helpers/nonIterableRest.js': 184,
            'node_modules/@babel/runtime/helpers/nonIterableSpread.js': 179,
            'node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js': 144,
            'node_modules/@babel/runtime/helpers/slicedToArray.js': 111,
            'node_modules/@babel/runtime/helpers/toConsumableArray.js': 105,
            'node_modules/@babel/runtime/helpers/typeof.js': 264,
            'node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js': 312,
            'node_modules/@emotion/cache/dist/cache.browser.esm.js': 1028,
            'node_modules/@emotion/core/dist/core.browser.esm.js': 2520,
            'node_modules/@emotion/core/dist/emotion-element-57a3a7a3.browser.esm.js': 1016,
            'node_modules/@emotion/css/dist/css.browser.esm.js': 127,
            'node_modules/@emotion/hash/dist/hash.browser.esm.js': 556,
            'node_modules/@emotion/memoize/dist/memoize.browser.esm.js': 86,
            'node_modules/@emotion/serialize/dist/serialize.browser.esm.js': 1830,
            'node_modules/@emotion/sheet/dist/sheet.browser.esm.js': 1128,
            'node_modules/@emotion/stylis/dist/stylis.browser.esm.js': 8204,
            'node_modules/@emotion/unitless/dist/unitless.browser.esm.js': 642,
            'node_modules/@emotion/utils/dist/utils.browser.esm.js': 385,
            'node_modules/@mikaelkristiansson/domready/ready.js': 435,
            'node_modules/@reach/router/es/index.js': 10313,
            'node_modules/@reach/router/es/lib/history.js': 2253,
            'node_modules/@reach/router/es/lib/utils.js': 2462,
            'node_modules/core-js/internals/a-function.js': 105,
            'node_modules/core-js/internals/an-object.js': 105,
            'node_modules/core-js/internals/array-includes.js': 276,
            'node_modules/core-js/internals/array-method-is-strict.js': 120,
            'node_modules/core-js/internals/array-method-uses-to-length.js': 356,
            'node_modules/core-js/internals/array-reduce.js': 367,
            'node_modules/core-js/internals/classof-raw.js': 71,
            'node_modules/core-js/internals/copy-constructor-properties.js': 159,
            'node_modules/core-js/internals/create-non-enumerable-property.js': 126,
            'node_modules/core-js/internals/create-property-descriptor.js': 96,
            'node_modules/core-js/internals/descriptors.js': 113,
            'node_modules/core-js/internals/document-create-element.js': 123,
            'node_modules/core-js/internals/engine-is-node.js': 63,
            'node_modules/core-js/internals/engine-user-agent.js': 58,
            'node_modules/core-js/internals/engine-v8-version.js': 199,
            'node_modules/core-js/internals/enum-bug-keys.js': 121,
            'node_modules/core-js/internals/export.js': 402,
            'node_modules/core-js/internals/fails.js': 59,
            'node_modules/core-js/internals/get-built-in.js': 177,
            'node_modules/core-js/internals/global.js': 260,
            'node_modules/core-js/internals/has.js': 69,
            'node_modules/core-js/internals/hidden-keys.js': 14,
            'node_modules/core-js/internals/ie8-dom-define.js': 148,
            'node_modules/core-js/internals/indexed-object.js': 174,
            'node_modules/core-js/internals/inspect-source.js': 147,
            'node_modules/core-js/internals/internal-state.js': 664,
            'node_modules/core-js/internals/is-forced.js': 248,
            'node_modules/core-js/internals/is-object.js': 79,
            'node_modules/core-js/internals/is-pure.js': 14,
            'node_modules/core-js/internals/native-weak-map.js': 98,
            'node_modules/core-js/internals/object-define-property.js': 260,
            'node_modules/core-js/internals/object-get-own-property-descriptor.js': 236,
            'node_modules/core-js/internals/object-get-own-property-names.js': 117,
            'node_modules/core-js/internals/object-get-own-property-symbols.js': 34,
            'node_modules/core-js/internals/object-keys-internal.js': 208,
            'node_modules/core-js/internals/object-property-is-enumerable.js': 148,
            'node_modules/core-js/internals/own-keys.js': 148,
            'node_modules/core-js/internals/path.js': 29,
            'node_modules/core-js/internals/redefine.js': 534,
            'node_modules/core-js/internals/require-object-coercible.js': 87,
            'node_modules/core-js/internals/set-global.js': 93,
            'node_modules/core-js/internals/shared-key.js': 89,
            'node_modules/core-js/internals/shared-store.js': 95,
            'node_modules/core-js/internals/shared.js': 204,
            'node_modules/core-js/internals/to-absolute-index.js': 102,
            'node_modules/core-js/internals/to-indexed-object.js': 67,
            'node_modules/core-js/internals/to-integer.js': 87,
            'node_modules/core-js/internals/to-length.js': 89,
            'node_modules/core-js/internals/to-object.js': 60,
            'node_modules/core-js/internals/to-primitive.js': 319,
            'node_modules/core-js/internals/uid.js': 114,
            'node_modules/core-js/modules/es.array.reduce.js': 270,
            'node_modules/decode-uri-component/index.js': 890,
            'node_modules/escape-string-regexp/index.js': 142,
            'node_modules/gatsby-link/index.js': 4314,
            'node_modules/gatsby-link/parse-path.js': 240,
            'node_modules/gatsby-plugin-catch-links/catch-links.js': 2352,
            'node_modules/gatsby-plugin-catch-links/gatsby-browser.js': 151,
            'node_modules/gatsby-plugin-google-analytics/gatsby-browser.js': 444,
            'node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js': 212,
            'node_modules/gatsby-plugin-manifest/gatsby-browser.js': 40,
            'node_modules/gatsby-plugin-manifest/get-manifest-pathname.js': 237,
            'node_modules/gatsby-plugin-nprogress/gatsby-browser.js': 2164,
            'node_modules/gatsby-plugin-sentry/gatsby-browser.js': 127,
            'node_modules/gatsby-plugin-twitter/gatsby-browser.js': 930,
            'node_modules/gatsby-react-router-scroll/index.js': 243,
            'node_modules/gatsby-react-router-scroll/scroll-container.js': 965,
            'node_modules/gatsby-react-router-scroll/scroll-handler.js': 1732,
            'node_modules/gatsby-react-router-scroll/session-storage.js': 730,
            'node_modules/gatsby-react-router-scroll/use-scroll-restoration.js': 350,
            'node_modules/gatsby-remark-autolink-headers/gatsby-browser.js': 722,
            'node_modules/gatsby-remark-images/constants.js': 395,
            'node_modules/gatsby-remark-images/gatsby-browser.js': 685,
            'node_modules/gatsby-source-wordpress-experimental/gatsby-browser.js': 18,
            'node_modules/gatsby/dist/internal-plugins/bundle-optimisations/polyfills/object-assign.js': 25,
            'node_modules/invariant/browser.js': 347,
            'node_modules/mitt/dist/mitt.es.js': 266,
            'node_modules/nprogress/nprogress.js': 4000,
            'node_modules/query-string/index.js': 5532,
            'node_modules/query-string/node_modules/strict-uri-encode/index.js': 149,
            'node_modules/shallow-compare/es/index.js': 151,
            'node_modules/split-on-first/index.js': 228,
            'node_modules/uuid/index.js': 59,
            'node_modules/uuid/lib/bytesToUuid.js': 297,
            'node_modules/uuid/lib/rng-browser.js': 428,
            'node_modules/uuid/v1.js': 823,
            'node_modules/uuid/v4.js': 256,
            'src/utils/analytics/hooks/useTracker.ts': 2476,
            'src/utils/analytics/types.ts': 49,
            'src/utils/analytics/utils/index.ts': 302,
            'src/utils/analytics/utils/legacy-helpers.js': 1092
        });
    });
});
