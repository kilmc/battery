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
export var addPropertyData = function (classMetaArr, matchers, props, generatedKeywordMetaData) {
    return classMetaArr.map(function (classMeta) {
        var matcher = Object.entries(matchers).find(function (_a) {
            var _b = __read(_a, 2), regex = _b[1];
            return regex.test(classMeta.source);
        });
        if (!matcher) {
            classMeta.invalid = true;
            return classMeta;
        }
        var _a = __read(matcher, 2), matcherName = _a[0], regex = _a[1];
        if (matcherName === 'keyword') {
            var property_1 = generatedKeywordMetaData.find(function (generated) {
                return new RegExp(generated.source).test(classMeta.source);
            }).property;
            classMeta.property = property_1;
            return classMeta;
        }
        var pluginSeparatorsRegex = new RegExp("[" + props.map(function (prop) { return prop.pluginSeparator; }).join('') + "]");
        var classNamespace = classMeta.source
            .match(regex)[2]
            .replace(pluginSeparatorsRegex, '');
        var property = props.find(function (prop) {
            if (classNamespace.length > 0 && prop.classNamespace) {
                var matched = prop.classNamespace.match(new RegExp(classNamespace));
                return (prop.valuePlugin === matcherName && matched && matched.length > 0);
            }
            else if (classNamespace.length === 0 && prop.pluginDefault) {
                return prop.valuePlugin === matcherName && prop.pluginDefault;
            }
            else {
                return false;
            }
        }).cssProperty;
        classMeta.property = property;
        return classMeta;
    });
};
