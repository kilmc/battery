import { PLUGIN_TYPES } from './plugins/';
import { subtractArrays } from './utils';

const sortClassNames = (classNames,sequencedRegexes) => Object
  .keys(sequencedRegexes)
  .sort((a,b) => b - a)
  .reduce((classNameGroups,charLength) => {
    Object.keys(sequencedRegexes[charLength]).forEach(pluginName => {
      const matchedClassNames = classNames
        .filter(cx => cx.match(sequencedRegexes[charLength][pluginName]));

      if (matchedClassNames.length !== 0) {
        if (!classNameGroups[pluginName]) {
          classNameGroups[pluginName] = matchedClassNames;
        } else {
          classNameGroups[pluginName] = [
            ...classNameGroups[pluginName],
            ...matchedClassNames
          ];
        }
      }
      classNames = subtractArrays(classNames,matchedClassNames);
    });

    return classNameGroups;
  },{});

export const sortClassNamesByPlugin = (classNames,pluginRegexes) => {
  const lookupRegexes = pluginRegexes[PLUGIN_TYPES.LOOKUP];
  const patternRegexes = pluginRegexes[PLUGIN_TYPES.PATTERN];

  const lookupClassNames = sortClassNames(classNames,lookupRegexes);
  const patternClassNames = sortClassNames(classNames,patternRegexes);

  return {
    ...lookupClassNames,
    ...patternClassNames
  };
};
