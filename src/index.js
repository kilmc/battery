import deepmerge from 'deepmerge';

import {
  generateKeywordValueObjs,
} from './plugins/keywordValueType';

import {
  generateValuePluginRegexSequencer,
  generateKeywordValueRegexSequencer
} from './sequencers';

import { sortClassNames } from './sorters';
import { convertClassNamestoClassObjs } from './classObject';

// ------------------------------------------------------------------
// ====================  G E N E R A T E  C S S  ====================
// ------------------------------------------------------------------

export const generateLibrary = (classNames,config) => {
  const { props, settings, plugins } = config;

  let classObjs;
  let keywordValueRegexes;

  // KeywordValues
  if (settings.enableKeywordValues) {
    const keywordValueObjs = generateKeywordValueObjs(props);
    keywordValueRegexes = generateKeywordValueRegexSequencer(keywordValueObjs,plugins);
  }

  const valuePluginRegexes = generateValuePluginRegexSequencer(plugins,props);
  const pluginRegexes = deepmerge(valuePluginRegexes,keywordValueRegexes);
  const sortedClassNames = sortClassNames(classNames,pluginRegexes);

  const convertedClassNames =
    convertClassNamestoClassObjs(sortedClassNames,plugins,props);

  classObjs = {
    ...convertedClassNames
  };

  return classObjs;
};