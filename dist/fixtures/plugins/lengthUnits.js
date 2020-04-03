var pxToRem = function (value) { return parseInt(value) / 16 + "rem"; };
var ratio = function (value) {
    var convertedValue = "" + parseInt(value) * 6;
    return pxToRem(convertedValue);
};
export var lengthUnitsPlugin = {
    type: 'pattern',
    name: 'lengthUnit',
    identifier: /-?\d+/,
    modifiers: [
        {
            name: 'ratio',
            defaultModifier: true,
            modifierFn: ratio,
        },
        {
            name: 'pixels',
            identifier: 'px',
            modifierFn: pxToRem,
        },
        {
            name: 'percent',
            identifier: 'p',
            modifierFn: function (value) { return value + "%"; },
        },
        {
            name: 'viewportHeight',
            identifier: 'vh',
            modifierFn: function (value) { return value + "vh"; },
        },
        {
            name: 'viewportWidth',
            identifier: 'vw',
            modifierFn: function (value) { return value + "vw"; },
        },
    ],
};
