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

    const propIdentifier = obj.source.match(regex)[2];
    const property = props.find(prop => {
      return (
        prop.plugin === matcherName &&
        new RegExp(prop.propIdentifier).test(propIdentifier)
      );
    }).prop;

    obj.property = property;
    return obj;
  });
