import { generateClassObject } from '../utils/classObjects';
var isPropMatch = function (arr1, arr2) {
    return arr1.every(function (item) { return arr2.includes(item); });
};
export var addClassObjectData = function (classMetaArr, config) {
    return classMetaArr.map(function (classMeta) {
        var propConfig = config.props.find(function (propConfig) {
            return isPropMatch(propConfig.cssProperty, classMeta.property);
        });
        var value = '';
        if (classMeta.keyword) {
            value =
                classMeta.explodedSource.valueIdentifier === ''
                    ? propConfig.values['__DEFAULT__']
                    : propConfig.values[classMeta.explodedSource.valueIdentifier];
            classMeta.classObject = generateClassObject(classMeta.property, value);
            return classMeta;
        }
        var plugin = config.plugins.find(function (pluginConfig) { return pluginConfig.name === classMeta.valuePlugin; });
        if (classMeta.valuePluginType === 'lookup') {
            value = plugin.values[classMeta.explodedSource.valueIdentifier];
        }
        if (classMeta.valuePluginType === 'pattern') {
            value = classMeta.explodedSource.valueIdentifier;
        }
        var modifierFn = function (x, y) { return "" + x + y; };
        if (classMeta.valueModifier) {
            modifierFn = plugin.modifiers.find(function (modifier) { return modifier.name === classMeta.valueModifier; }).modifierFn;
            value = modifierFn(value, classMeta.explodedSource.modifierIdentifier);
        }
        classMeta.classObject = generateClassObject(classMeta.property, value);
        return classMeta;
    });
};
