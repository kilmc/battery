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
export var classMetaToCSS = function (classMeta, plugins) {
    var desclarations = Object.entries(classMeta.classObject)
        .reduce(function (accum, _a) {
        var _b = __read(_a, 2), property = _b[0], value = _b[1];
        return accum.concat(property + ": " + value);
    }, [])
        .join(';');
    if (classMeta.selectorPlugin) {
        var selectorModifier = plugins
            .find(function (plugin) { return plugin.name === classMeta.selectorPlugin; })
            .modifiers.find(function (modifier) { return modifier.name === classMeta.selectorModifier; });
        classMeta.selector = selectorModifier.modifierFn(classMeta.selector, classMeta.explodedSource.prefix);
    }
    return "." + classMeta.selector + " { " + desclarations + " }";
};
