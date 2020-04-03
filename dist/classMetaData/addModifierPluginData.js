import { getMatcherName } from '../matchers/utils';
import { generateModifierMatchers } from '../matchers/generateModifierMatchers';
export var addModifierPluginData = function (classMetaArr, plugins) {
    return classMetaArr.map(function (classMeta) {
        if (!plugins || plugins.length < 1)
            return classMeta;
        var modifierIdentifier = classMeta.explodedSource.modifierIdentifier;
        var hasNonDefaultModifier = modifierIdentifier.length > 0;
        var plugin = plugins.find(function (plugin) {
            return plugin.name === classMeta.valuePlugin;
        });
        if (!plugin || !plugin.modifiers)
            return classMeta;
        var defaultModifier = plugin.modifiers.find(function (modifier) { return modifier.defaultModifier; });
        if (hasNonDefaultModifier) {
            var modifierName = getMatcherName(generateModifierMatchers(plugin), classMeta.source)[0];
            classMeta.valueModifier = modifierName;
        }
        else if (defaultModifier) {
            classMeta.valueModifier = defaultModifier.name;
        }
        return classMeta;
    });
};
