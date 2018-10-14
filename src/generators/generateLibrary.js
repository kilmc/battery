import deepmerge from 'deepmerge';
import { generateKeywordValueObjs } from '../plugins/keywordValueType';
import { processConfig } from '../config/';

import {
  generateValuePluginRegexObj,
  generateKeywordValueRegexObj
} from '../sequencers';

import sortClassNames from '../sortClassNames';
import { convertClassNamestoClassObjs } from '../classObject';
import { processClassType } from '../plugins/classType';

const generateLibrary = (classNames, config) => {
  const { props, plugins = [] } = processConfig(config);
  let toProcessClasses = [...classNames];

  let classObjs;
  let keywordValueRegexes;

  // KeywordValues
  const keywordValueObjs = generateKeywordValueObjs(props);
  keywordValueRegexes = generateKeywordValueRegexObj(keywordValueObjs, plugins);

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

  if (plugins.length > 1) {
    classObjs = {
      ...processClassType(toProcessClasses, config)
    };
  }

  classObjs = {
    ...classObjs,
    ...convertedClassNames
  };

  return classObjs;
};

export default generateLibrary;
