import { ClassMetaData } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';

export const addClassObjectData = (
  classNameMeta: ClassMetaData[],
  config: BatteryConfig,
) => {
  return classNameMeta.map(obj => {
    const propConfig = config.props.find(
      propConfig => propConfig.prop === obj.property,
    );
    let value = '';

    if (obj.keyword) {
      value = propConfig.keywordValues[obj.explodedSource.valueIdentifier];
      obj.classObject = { [obj.property]: value };
      return obj;
    }

    const plugin = config.plugins.find(
      pluginConfig => pluginConfig.name === obj.valuePlugin,
    );

    if (obj.valuePluginType === 'lookup') {
      value = plugin.values[obj.explodedSource.valueIdentifier];
    }

    if (obj.valuePluginType === 'pattern') {
      value = obj.explodedSource.valueIdentifier;
    }

    if (obj.modifierPlugin) {
      const modifierFn = plugin.modifiers.find(
        modifier => modifier.name === obj.modifierPlugin,
      ).modifierFn;
      value = modifierFn(value, obj.explodedSource.modifierIdentifier);
    }

    obj.classObject = { [obj.property]: value };

    return obj;
  });
};
