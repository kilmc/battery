import deepmerge from 'deepmerge';
import { generateKeywordValueObjs } from '../classObject';
import { processConfig } from '../config/';

import {
  generateValuePluginRegexObj,
  generateKeywordValueRegexObj
} from '../sequencers';

import sortClassNames from '../sortClassNames';
import { convertClassNamestoClassObjs } from '../classObject';
import { processClassType } from '../plugins/classType';
import { orderClasses } from './generateCSS/generateClasses';

const generateLibrary = (classNames, config) => {
  // console.log(config);
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

  return orderClasses(classObjs, config);
};

export default generateLibrary;
