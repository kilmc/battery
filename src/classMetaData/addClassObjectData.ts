import { ClassMetaData } from 'types/classname';
import { BatteryConfig } from 'types/battery-config';

export const addClassObjectData = (
  classMetaArr: ClassMetaData[],
  config: BatteryConfig,
) => {
  return classMetaArr.map(classMeta => {
    const propConfig = config.props.find(
      propConfig => propConfig.prop === classMeta.property,
    );
    let value = '';

    if (classMeta.keyword) {
      value =
        propConfig.keywordValues[classMeta.explodedSource.valueIdentifier];
      classMeta.classObject = { [classMeta.property]: value };
      return classMeta;
    }

    const plugin = config.plugins.find(
      pluginConfig => pluginConfig.name === classMeta.valuePlugin,
    );

    if (classMeta.valuePluginType === 'lookup') {
      value = plugin.values[classMeta.explodedSource.valueIdentifier];
    }

    if (classMeta.valuePluginType === 'pattern') {
      value = classMeta.explodedSource.valueIdentifier;
    }

    let modifierFn = (x: string, y: string) => `${x}${y}`;

    if (classMeta.valueModifier) {
      modifierFn = plugin.modifiers.find(
        modifier => modifier.name === classMeta.valueModifier,
      ).modifierFn;
      value = modifierFn(value, classMeta.explodedSource.modifierIdentifier);
    }

    classMeta.classObject = { [classMeta.property]: value };

    return classMeta;
  });
};
