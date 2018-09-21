import deepmerge from 'deepmerge';

import { subtractArrays } from '../utils';
import { generateKeywordValueObjs } from '../plugins/keywordValueType';
import { processConfig } from '../config/index';

import { expandMolecules, mergeMolecules } from '../molecules/index';

import {
  generateValuePluginRegexObj,
  generateKeywordValueRegexObj
} from '../sequencers';

import sortClassNames from '../sortClassNames';
import { convertClassNamestoClassObjs } from '../classObject';
import { BatteryConfig } from '../types/index';

const generateLibrary = (classNames: string[], config: BatteryConfig) => {
  const { props, settings, plugins = [] } = processConfig(config);

  let expandedMoluecules: string[] = [];
  let toProcessClasses = [...classNames];

  if (config.molecules) {
    expandedMoluecules = expandMolecules(classNames, config);
    toProcessClasses = toProcessClasses.concat(expandedMoluecules);
  }

  let classObjs: {};
  let keywordValueRegexes;

  // KeywordValues
  if (settings.enableKeywordValues) {
    const keywordValueObjs = generateKeywordValueObjs(props);
    keywordValueRegexes = generateKeywordValueRegexObj(
      keywordValueObjs,
      plugins
    );
  }

  const valuePluginRegexes = generateValuePluginRegexObj(plugins, props);
  const pluginRegexes = deepmerge(valuePluginRegexes, keywordValueRegexes);
  // Sort classnames
  const sortedClassNames = sortClassNames(toProcessClasses, pluginRegexes);

  // Convert sorted classnames into classObjs
  const convertedClassNames = convertClassNamestoClassObjs(
    sortedClassNames,
    plugins,
    props
  );

  classObjs = {
    ...convertedClassNames
  };

  if (expandedMoluecules.length > 0) {
    classObjs = {
      ...classObjs,
      ...mergeMolecules(classNames, classObjs, config)
    };

    subtractArrays([...expandedMoluecules], [...classNames]).forEach(cx => {
      Reflect.deleteProperty(classObjs, cx);
    });
  }

  return classObjs;
};

export default generateLibrary;
