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
export var addSourceData = function (classNameArr, matchers) {
    return classNameArr.map(function (className) {
        var matcher = Object.entries(matchers).find(function (_a) {
            var _b = __read(_a, 2), regex = _b[1];
            return regex.test(className);
        });
        var classMeta = { source: className, selector: className };
        if (!matcher) {
            classMeta.invalid = true;
            return classMeta;
        }
        return classMeta;
    });
};
