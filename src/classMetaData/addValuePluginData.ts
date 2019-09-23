import { ClassMetaData } from 'types/classname';
import { Matchers } from 'types/matchers';
import { ValuePlugin } from 'types/plugin-config';

export const addValuePluginData = (
  classNameData: ClassMetaData[],
  valuePluginMatchers: Matchers,
  plugins: ValuePlugin[],
): ClassMetaData[] => {
  return classNameData.map(obj => {
    if (obj.keyword) return obj;
    const pluginName = Object.entries(valuePluginMatchers).find(
      ([_, regex]) => {
        return regex.test(obj.source);
      },
    );

    const plugin = plugins.find(
      pluginConfig => pluginConfig.name === pluginName[0],
    );

    obj.valuePlugin = plugin.name;
    obj.valuePluginType = plugin.type;
    return obj;
  });
};
