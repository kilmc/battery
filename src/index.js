import {
  generateKeywordValueObjs,
  getKeywordClassObjs
} from './plugins/keywordValueType';

import { generateValuePluginRegexSequencer } from './sequencers';
import { sortClassNamesByPlugin } from './sorters';
import { convertClassNamestoClassObjs } from './classObject';

// ------------------------------------------------------------------
// ====================  G E N E R A T E  C S S  ====================
// ------------------------------------------------------------------

export const generateLibrary = (classNames,config) => {
  const { props, settings, plugins } = config;

  let classObjs;
  let keywordClassObjs;

  // KeywordValues
  if (settings.enableKeywordValues) {
    const keywordValueObjs = generateKeywordValueObjs(props);
    keywordClassObjs = getKeywordClassObjs(classNames,keywordValueObjs);
  }

  const pluginRegexes = generateValuePluginRegexSequencer(plugins,props);
  const sortedClassNames = sortClassNamesByPlugin(classNames,pluginRegexes);

  const convertedClassNames =
    convertClassNamestoClassObjs(sortedClassNames,plugins,props);

  classObjs = {
    ...keywordClassObjs,
    ...convertedClassNames
  };

  return classObjs;
};