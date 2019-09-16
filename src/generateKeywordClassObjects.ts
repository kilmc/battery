import { BatteryConfig } from 'types/battery-config';
import { ClassObjectGroup } from 'types/classname';

export const generateKeywordClassObjects = (
  config: BatteryConfig,
): ClassObjectGroup => {
  const keywordProps = config.props.filter(
    prop => prop.keywordValues !== undefined,
  );

  const classObjects: ClassObjectGroup = keywordProps.reduce(
    (accum: ClassObjectGroup, propConfig) => {
      const {
        prop,
        propIdentifier = '',
        keywordSeparator = '',
        keywordValues,
      } = propConfig;

      Object.entries(keywordValues).map(([valueIdentifier, value]) => {
        const className = `${propIdentifier}${keywordSeparator}${valueIdentifier}`;
        accum[className] = { [prop]: value };
      });

      return accum;
    },
    {},
  );

  return classObjects;
};
