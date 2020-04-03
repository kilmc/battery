var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { generateKeywordMatcher } from '../matchers/generateKeywordMatcher';
import { generateValuePluginMatcher } from './generateValuePluginMatcher';
export var generateMatchers = function (config, keywordClassMetaData) {
    var keywordMatcher = {};
    if (keywordClassMetaData && keywordClassMetaData.length > 0) {
        keywordMatcher = generateKeywordMatcher(keywordClassMetaData, config.plugins);
    }
    return __assign(__assign({}, keywordMatcher), generateValuePluginMatcher(config.plugins, config.props));
};
