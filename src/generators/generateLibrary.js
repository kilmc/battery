import deepmerge from 'deepmerge';

import { subtractArrays } from '../utils';
import { generateKeywordValueObjs } from '../plugins/keywordValueType';
import { processConfig } from '../config/';

import {
  expandMolecules,
  mergeMolecules
} from '../molecules/';

import {
  generateValuePluginRegexObj,
  generateKeywordValueRegexObj
} from '../sequencers';

import sortClassNames from '../sortClassNames';
import { convertClassNamestoClassObjs } from '../classObject';

const mergePluginRestrictions = (propConfigs) => {
  return propConfigs.reduce((xs,x) => {
    const { allowedValues = [], disallowedValues = [], enablePlugin } = x;

    if (!xs[enablePlugin]) {
      xs[enablePlugin] = { allowedValues, disallowedValues };
    } else {
      xs[enablePlugin].allowedValues = xs[enablePlugin].allowedValues.concat(allowedValues);
      xs[enablePlugin].disallowedValues = xs[enablePlugin].disallowedValues.concat(disallowedValues);
    }
    return xs;
  },{});
};

const filterAllowedClassNames = (classNames, config) => {
  let filteredClasses = {...classNames};
  const { props } = config;

  const propsWithRestrictions = props.filter(prop => prop.allowedValues || prop.disallowedValues);
  if (propsWithRestrictions.length < 1) return classNames;

  const gathered = mergePluginRestrictions(propsWithRestrictions);

  Object.keys(gathered).forEach(x => {
    console.log(gathered);
    console.log('STEP 1: ',filteredClasses)
    filteredClasses[x] = filteredClasses[x].filter(y => gathered[x].allowedValues.includes(y));
    console.log('STEP 2: ',filteredClasses)
    filteredClasses[x] = filteredClasses[x].filter(y => !gathered[x].disallowedValues.includes(y));
    console.log('STEP 3: ',filteredClasses)
  });
  console.log('FUCKERS',filteredClasses);
  return filteredClasses;
};

const generateLibrary = (classNames,config) => {
  const { props, settings, plugins } = processConfig(config);

  let expandedMoluecules = [];
  let toProcessClasses = [...classNames];

  if (config.molecules) {
    expandedMoluecules = expandMolecules(classNames,config);
    toProcessClasses = toProcessClasses.concat(expandedMoluecules);
  }

  let classObjs;
  let keywordValueRegexes;

  // KeywordValues
  if (settings.enableKeywordValues) {
    const keywordValueObjs = generateKeywordValueObjs(props);
    keywordValueRegexes = generateKeywordValueRegexObj(keywordValueObjs,plugins);
  }


  const valuePluginRegexes = generateValuePluginRegexObj(plugins,props);
  const pluginRegexes = deepmerge(valuePluginRegexes,keywordValueRegexes);
  // Sort classnames
  const sortedClassNames = sortClassNames(toProcessClasses,pluginRegexes);

  // Convert sorted classnames into classObjs
  const convertedClassNames =
    convertClassNamestoClassObjs(sortedClassNames,plugins,props);

  classObjs = {
    ...convertedClassNames
  };

  if(expandedMoluecules.length > 0) {
    classObjs = {
      ...classObjs,
      ...mergeMolecules(classNames,classObjs,config)
    };

    subtractArrays([...expandedMoluecules],[...classNames]).forEach(cx => {
      Reflect.deleteProperty(classObjs,cx);
    });
  }

  return classObjs;
};

export default generateLibrary;
