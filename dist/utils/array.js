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
export var baseToCapture = function (nonCapture) { return function (arr, optional) {
    if (optional === void 0) { optional = false; }
    if (arr.length < 1) {
        return '';
    }
    var optionalRegex = optional ? '|' : '';
    var nonCaptureRegex = nonCapture ? '?:' : '';
    var sortedJoined = arr.sort(function (a, b) { return b.length - a.length; }).join('|');
    return "(" + nonCaptureRegex + sortedJoined + optionalRegex + ")";
}; };
export var toCapture = baseToCapture(false);
export var toGroup = baseToCapture(true);
export var unique = function (arr) { return __spread(new Set(arr)); };
