var hexToRgba = function (hex, opacity) {
    var hexValue = hex.replace('#', '');
    var r = parseInt(hexValue.substring(0, 2), 16);
    var g = parseInt(hexValue.substring(2, 4), 16);
    var b = parseInt(hexValue.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + parseInt(opacity) / 100 + ")";
};
export var colorPlugin = {
    type: 'lookup',
    name: 'color',
    values: {
        black: '#000000',
        white: '#FFFFFF',
        pink: '#FF9DD8',
    },
    modifiers: [
        {
            name: 'opacity',
            separator: '_',
            identifier: /\d+/,
            modifierFn: hexToRgba,
        },
    ],
};
