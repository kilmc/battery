import { ClassMetaData } from '../types/classname';
import { DeveloperBatteryConfig } from '../types/battery-config';
import { addClassObjectData } from './addClassObjectData';
import { addKeywordData } from './addKeywordData';
import { addSourceData } from './addSourceData';
import { generateMatchers } from '../matchers/generateMatchers';
import { keywordToMetaData } from './keywordToMetaData';
import { addPropertyData } from './addPropertyData';
import { addValuePluginData } from './addValuePluginData';
import { Matchers } from '../types/matchers';
import { PluginConfig } from '../types/plugin-config';
import { addExplodedSourceData } from './addExplodedSourceData';
import { addModifierPluginData } from './addModifierPluginData';
import { addClassPluginData } from './addClassPluginData';

const getPlugins = (
  pluginTypes: string[],
  matchers: Matchers,
  plugins: PluginConfig[],
) => {
  if (!plugins) return {};

  return Object.entries(matchers)
    .filter(([matcherName]) => {
      const valuePlugins = plugins
        .filter(plugin => pluginTypes.includes(plugin.type))
        .map(plugin => `${plugin.name}`);

      return valuePlugins.includes(matcherName);
    })
    .reduce(
      (accum, [matcherName, regex]) => {
        accum[matcherName] = regex;
        return accum;
      },
      {} as Matchers,
    );
};

const sortValidAndInvalid = (classMeta: ClassMetaData[]) =>
  classMeta.reduce(
    (accum, obj) => {
      if (!accum['invalidClassMeta']) {
        accum['invalidClassMeta'] = [];
      }
      if (!accum['validClassMeta']) {
        accum['validClassMeta'] = [];
      }

      accum[obj.invalid ? 'invalidClassMeta' : 'validClassMeta'].push(obj);
      return accum;
    },
    {} as {
      validClassMeta: ClassMetaData[];
      invalidClassMeta: ClassMetaData[];
    },
  );

export const addMetaData = (
  classNames: string[],
  config: DeveloperBatteryConfig,
): ClassMetaData[] => {
  const keywords = keywordToMetaData(config);
  const matchers = generateMatchers(config, keywords);
  const valuePluginMatchers = getPlugins(
    ['pattern', 'lookup'],
    matchers,
    config.plugins,
  );

  // Adds: source, invalid, selector
  const withSourceData = addSourceData(classNames, matchers);
  const { validClassMeta } = sortValidAndInvalid(withSourceData);

  // Adds: keyword
  const withKeywordData = addKeywordData(validClassMeta, matchers);

  // Adds: valuePlugin, valuePluginType
  const withValuePluginData = addValuePluginData(
    withKeywordData,
    valuePluginMatchers,
    config.plugins,
  );

  // Adds: property
  const withPropertyData = addPropertyData(
    withValuePluginData,
    matchers,
    config.props,
    keywords,
  );

  // Adds: explodedSource
  const withExplodedSourceData = addExplodedSourceData(
    withPropertyData,
    config,
    matchers,
    config.plugins,
  );

  // Adds: valueModifier
  const withModifierPlugin = addModifierPluginData(
    withExplodedSourceData,
    config.plugins,
  );

  // Adds: selectorPlugin, atrulePlugin
  const withClassPluginData = addClassPluginData(
    withModifierPlugin,
    config.plugins,
  );

  // Adds: classObject
  const withClassObject = addClassObjectData(withClassPluginData, config);

  return withClassObject;
};
