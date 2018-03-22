import { subtractArrays } from './utils';

export const sortClassNames = (classNames,sequencedRegexes) => Object
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
