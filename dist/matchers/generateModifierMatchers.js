export var generateModifierMatchers = function (plugin) {
    return plugin.modifiers.reduce(function (accum, modifier) {
        var name = modifier.name, _a = modifier.separator, separator = _a === void 0 ? '' : _a, identifier = modifier.identifier;
        if (modifier.defaultModifier) {
            accum[name] = new RegExp('__DEFAULT__');
            return accum;
        }
        else {
            var processedIdentifier = typeof identifier === 'string' ? identifier : identifier.source;
            accum[name] = new RegExp("" + separator + processedIdentifier);
            return accum;
        }
    }, {});
};
