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
export var addValuePluginData = function (classMetaArr, valuePluginMatchers, plugins) {
    return classMetaArr.map(function (classMeta) {
        if (classMeta.keyword)
            return classMeta;
        var pluginName = Object.entries(valuePluginMatchers).find(function (_a) {
            var _b = __read(_a, 2), regex = _b[1];
            return regex.test(classMeta.source);
        });
        var plugin = plugins.find(function (pluginConfig) { return pluginConfig.name === pluginName[0]; });
        classMeta.valuePlugin = plugin.name;
        if (plugin.type === 'lookup' || plugin.type === 'pattern') {
            classMeta.valuePluginType = plugin.type;
        }
        return classMeta;
    });
};
