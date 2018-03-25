import deepmerge from 'deepmerge';

import { processClassNameTypes } from './plugins/classNameType';
import { generateKeywordValueObjs } from './plugins/keywordValueType';
import { generateAtRules, atomsToCSS } from './generators/generateCSS';
import { processConfig } from './config/';

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
  const { props, settings, plugins } = processConfig(config);

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

export const generateCSS = (classNames, config) => {
  const { plugins } = config;

  const library = generateLibrary(classNames,config);
  let libraryCSS = '';

  libraryCSS += generateAtRules(library,plugins);
  processClassNameTypes(library,plugins);

  libraryCSS = `${atomsToCSS(library)}\n${libraryCSS}`;

  return libraryCSS;
};