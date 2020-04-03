var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { generateClassObject } from '../utils/classObjects';
export var keywordToMetaData = function (config) {
    var keywordProps = config.props.filter(function (prop) { return prop.values; });
    if (keywordProps.length === 0) {
        return [];
    }
    return keywordProps
        .map(function (propConfig) { return __spread(Object.entries(propConfig.values).reduce(function (accum, _a) {
        var _b = __read(_a, 2), valueIdentifier = _b[0], value = _b[1];
        var _c = propConfig.valueSeparator, valueSeparator = _c === void 0 ? '' : _c, _d = propConfig.classNamespace, classNamespace = _d === void 0 ? '' : _d, cssProperty = propConfig.cssProperty;
        var isDefaultValue = valueIdentifier === '__DEFAULT__';
        var sanitizedValueIdentifier = isDefaultValue
            ? ''
            : valueIdentifier;
        var processedSource = isDefaultValue
            ? "" + classNamespace + sanitizedValueIdentifier
            : "" + classNamespace + valueSeparator + sanitizedValueIdentifier;
        var classMetaDataObj = {
            source: processedSource,
            keyword: true,
            property: cssProperty,
            explodedSource: {
                classNamespace: classNamespace,
                valueOrPluginSeparator: valueSeparator,
                valueIdentifier: sanitizedValueIdentifier,
            },
            classObject: generateClassObject(cssProperty, value),
        };
        return accum.concat(classMetaDataObj);
    }, [])); })
        .reduce(function (xs, x) { return xs.concat(x); });
};
