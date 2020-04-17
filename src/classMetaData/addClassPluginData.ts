import { ClassMetaData } from '../types/classname';
import { PluginConfig } from '../types/plugin-config';

const addAffixData = (
  affixType: 'prefix' | 'suffix',
  affix: string,
  plugins: PluginConfig[],
) => {
  const affixPlugins = plugins.filter(plugin => plugin.affixType === affixType);

  const matchedPlugin = affixPlugins.find(plugin => {
    return Object.values(plugin.modifiers)
      .map(modifier => modifier.identifier)
      .includes(affix);
  });

  if (!matchedPlugin) {
    return {};
  }

  const matchedModifier = Object.values(matchedPlugin.modifiers).find(
    modifier => modifier.identifier === affix,
  );

  const pluginName = matchedPlugin.name;
  const pluginType = matchedPlugin.type;

  // needs to be the key of the modifier
  const modifierName = matchedModifier.name;

  let affixData: {
    atrulePlugin?: Plugin;
    atruleModifier?: string;
    selectorPlugin?: Plugin;
    selectorModifier?: string;
  } = {};

  if (pluginType === 'at-rule') {
    affixData.atrulePlugin = pluginName;
    affixData.atruleModifier = modifierName;
  } else if (pluginType === 'selector') {
    affixData.selectorPlugin = pluginName;
    affixData.selectorModifier = modifierName;
  }

  return affixData;
};

export const addClassPluginData = (
  classMetaArr: ClassMetaData[],
  plugins: PluginConfig[],
): ClassMetaData[] => {
  if (plugins && plugins.filter(plugin => plugin.affixType).length < 1) {
    return classMetaArr;
  }

  return classMetaArr.map(classMeta => {
    const { prefix, suffix } = classMeta.explodedSource;
    let prefixData = {};
    let suffixData = {};

    if (prefix) {
      prefixData = addAffixData('prefix', prefix, plugins);
    }

    if (suffix) {
      suffixData = addAffixData('suffix', suffix, plugins);
    }
    return { ...classMeta, ...prefixData, ...suffixData };
  });
};
