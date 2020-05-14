import { ClassMetaData } from '../types/classname';
import { DeveloperBatteryConfig } from '../types/battery-config';
import { addClassObjectData } from './addClassObjectData';
import { addKeywordData } from './addKeywordData';
import { addSourceData } from './addSourceData';
import { generateMatchers } from '../matchers/generateMatchers';
import { keywordToMetaData } from './keywordToMetaData';
import { addPropertyData } from './addPropertyData';
import { addValuePluginData } from './addValuePluginData';
import { addExplodedSourceData } from './addExplodedSourceData';
import { addValueModifierPluginData } from './addValueModifierPluginData';
import { addClassPluginData } from './addClassPluginData';

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

  // Adds: source, invalid, selector
  const withSourceData = addSourceData(classNames, matchers);
  const { validClassMeta } = sortValidAndInvalid(withSourceData);

  // Adds: keyword
  const withKeywordData = addKeywordData(validClassMeta, matchers);

  // Adds: valuePlugin
  const withValuePluginData = addValuePluginData(
    withKeywordData,
    matchers,
    config.props,
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
  const withModifierPlugin = addValueModifierPluginData(withExplodedSourceData);

  // Adds: selectorPlugin, atrulePlugin
  const withClassPluginData = addClassPluginData(
    withModifierPlugin,
    config.plugins,
  );

  // Adds: classObject
  const withClassObject = addClassObjectData(withClassPluginData, config);

  return withClassObject;
};
