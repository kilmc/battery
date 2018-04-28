import deepmerge from 'deepmerge';

import { generateKeywordValueObjs } from '../plugins/keywordValueType';
import { processConfig } from '../config/';

import {
  generateValuePluginRegexObj,
  generateKeywordValueRegexObj
} from '../sequencers';

import sortClassNames from '../sortClassNames';
import { convertClassNamestoClassObjs } from '../classObject';

const generateLibrary = (classNames,config) => {
  const { props, settings, plugins } = processConfig(config);

  let classObjs;
  let keywordValueRegexes;

  // KeywordValues
  if (settings.enableKeywordValues) {
    const keywordValueObjs = generateKeywordValueObjs(props);
    keywordValueRegexes = generateKeywordValueRegexObj(keywordValueObjs,plugins);
  }


  const valuePluginRegexes = generateValuePluginRegexObj(plugins,props);
  const pluginRegexes = deepmerge(valuePluginRegexes,keywordValueRegexes);
  const sortedClassNames = sortClassNames(classNames,pluginRegexes);

  const convertedClassNames =
    convertClassNamestoClassObjs(sortedClassNames,plugins,props);

  classObjs = {
    ...convertedClassNames
  };

  return classObjs;
};

export default generateLibrary;
