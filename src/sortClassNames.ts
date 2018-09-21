import { subtractArrays } from './utils';

const sortClassNames = (
  classNames: string[],
  sequencedRegexes: { [key: string]: string }
): { [key: string]: string[] } =>
  Object.keys(sequencedRegexes).reduce(
    (classNameGroups: { [key: string]: string[] }, pluginName) => {
      const matchedClassNames = classNames.filter(cx =>
        cx.match(sequencedRegexes[pluginName])
      );

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
      classNames = subtractArrays(classNames, matchedClassNames);

      return classNameGroups;
    },
    {}
  );

export default sortClassNames;
