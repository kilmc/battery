export var capitalizeFirstLetter = function (x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
};
export function sortAlphaNum(a, b) {
    var alphaRegex = /[^a-zA-Z]/g;
    var numberRegex = /[^0-9]/g;
    var aAlpha = a.replace(alphaRegex, '');
    var bAlpha = b.replace(alphaRegex, '');
    if (aAlpha === bAlpha) {
        var aNumbers = parseInt(a.replace(numberRegex, ''), 10);
        var bNumber = parseInt(b.replace(numberRegex, ''), 10);
        return aNumbers === bNumber ? 0 : aNumbers > bNumber ? 1 : -1;
    }
    else {
        return aAlpha > bAlpha ? 1 : -1;
    }
}
