export var generateClassObject = function (propsArr, value) {
    return propsArr.reduce(function (accum, prop) {
        accum[prop] = value;
        return accum;
    }, {});
};
