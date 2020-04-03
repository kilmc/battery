import { toCapture } from '../utils/array';
import { generatePrefixSuffixdMatchers } from './generatePrefixSuffixMatchers';
export var generateKeywordMatcher = function (metaDataArr, plugins) {
    var _a = generatePrefixSuffixdMatchers(plugins), prefixes = _a.prefixes, suffixes = _a.suffixes;
    var sortedClassNames = toCapture(metaDataArr.map(function (metaData) { return "" + metaData.source; }));
    return {
        keyword: new RegExp("(" + prefixes + ")" + sortedClassNames + "(" + suffixes + ")"),
    };
};
