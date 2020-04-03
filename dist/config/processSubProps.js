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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var formatBorderProp = function (rootProp, subProp) {
    var _a = __read(rootProp.split('-'), 2), start = _a[0], end = _a[1];
    return start + "-" + subProp + "-" + end;
};
var subPropMapper = {
    all: [],
    top: ['top'],
    right: ['right'],
    bottom: ['bottom'],
    left: ['left'],
    horizontal: ['right', 'left'],
    vertical: ['top', 'bottom'],
};
var processedProp = function (propsArr, baseProp) {
    if (propsArr.length === 0) {
        return [baseProp];
    }
    return baseProp.match('border-')
        ? propsArr.map(function (subProp) { return formatBorderProp(baseProp, subProp); })
        : propsArr.map(function (subProp) { return baseProp + "-" + subProp; });
};
export var convertSubProps = function (config) {
    var convertedPropConfigs = config.props
        .filter(function (propConfig) { return typeof propConfig.subProps === 'object'; })
        .map(function (propConfig) {
        var subPropsConfig = propConfig.subProps;
        var generatedConfigs = Object.entries(subPropsConfig).reduce(function (accum, _a) {
            var _b = __read(_a, 2), subPropGroup = _b[0], subPropIdentifier = _b[1];
            var classNamespace = propConfig.classNamespace, _c = propConfig.subPropSeparator, subPropSeparator = _c === void 0 ? '' : _c, cssProperty = propConfig.cssProperty, rest = __rest(propConfig, ["classNamespace", "subPropSeparator", "cssProperty"]);
            var newProp = processedProp(subPropMapper[subPropGroup], cssProperty[0]);
            var newPropIdentifier = "" + classNamespace + subPropSeparator + subPropIdentifier;
            var newPropConfig = __assign({ cssProperty: newProp, classNamespace: newPropIdentifier }, rest);
            return accum.concat(newPropConfig);
        }, []);
        return generatedConfigs;
    })
        .reduce(function (xs, x) { return xs.concat(x); }, []);
    var propsWithoutSubPropConfigs = config.props.filter(function (propConfig) { return typeof propConfig.subProps !== 'object'; });
    return __assign(__assign({}, config), { props: __spread(propsWithoutSubPropConfigs, convertedPropConfigs) });
};
