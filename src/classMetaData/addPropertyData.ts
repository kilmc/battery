import { ClassMetaData } from 'types/classname';
import { Matchers } from 'types/matchers';
import { UserPropConfig } from 'types/prop-config';

export const addPropertyData = (
  classNameData: ClassMetaData[],
  matchers: Matchers,
  props: UserPropConfig[],
  generatedKeywordMetaData: ClassMetaData[],
): ClassMetaData[] =>
  classNameData.map(obj => {
    const matcher = Object.entries(matchers).find(([_, regex]) => {
      return regex.test(obj.source);
    });

    if (!matcher) {
      obj.invalid = true;
      return obj;
    }

    const [matcherName, regex] = matcher;

    if (matcherName === 'keyword') {
      const property = generatedKeywordMetaData.find(
        generated => generated.source === obj.source,
      ).property;
      obj.property = property;

      return obj;
    }

    const pluginSeparatorsRegex = new RegExp(
      `[${props.map(prop => prop.pluginSeparator).join('')}]`,
    );

    const propIdentifier = obj.source
      .match(regex)[2]
      .replace(pluginSeparatorsRegex, '');

    const property = props.find(prop => {
      if (propIdentifier.length > 0 && prop.propIdentifier) {
        const matched = propIdentifier.match(new RegExp(prop.propIdentifier));
        return prop.plugin === matcherName && matched && matched.length > 0;
      } else if (propIdentifier.length === 0 && prop.pluginDefault) {
        return prop.plugin === matcherName && prop.pluginDefault;
      } else {
        return false;
      }
    }).prop;

    obj.property = property;
    return obj;
  });
