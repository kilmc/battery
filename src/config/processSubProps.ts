import { PropertyConfig, SubPropKeys } from 'types/prop-config';
import { CSSProperties } from 'types/css';

const formatBorderProp = (rootProp: string, subProp: string) => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}` as CSSProperties;
};

const subPropMapper: { [key in SubPropKeys]: string[] } = {
  all: [],
  top: ['top'],
  right: ['right'],
  bottom: ['bottom'],
  left: ['left'],
  horizontal: ['right', 'left'],
  vertical: ['top', 'bottom'],
};

const processedProp = (propsArr: string[], baseProp: CSSProperties) => {
  if (propsArr.length === 0) {
    return [baseProp];
  }

  return baseProp.match('border-')
    ? propsArr.map(subProp => formatBorderProp(baseProp, subProp))
    : propsArr.map(subProp => `${baseProp}-${subProp}` as CSSProperties);
};

export const convertSubProps = (props: PropertyConfig[]) => {
  const convertedPropConfigs = props
    .filter(propConfig => typeof propConfig.subProps === 'object')
    .map(propConfig => {
      const subPropsConfig = propConfig.subProps;
      const generatedConfigs = Object.entries(subPropsConfig).reduce(
        (accum, [subPropGroup, subPropIdentifier]: [SubPropKeys, string]) => {
          const {
            classNamespace,
            subProps,
            subPropSeparator = '',
            cssProperty,
            ...rest
          } = propConfig;

          const newProp = processedProp(
            subPropMapper[subPropGroup],
            cssProperty[0],
          );

          const newPropIdentifier = `${classNamespace}${subPropSeparator}${subPropIdentifier}`;
          const newPropConfig = {
            cssProperty: newProp,
            classNamespace: newPropIdentifier,
            ...rest,
          };
          return accum.concat(newPropConfig);
        },
        [] as PropertyConfig[],
      );
      return generatedConfigs;
    })
    .reduce((xs, x) => xs.concat(x), []);

  const propsWithoutSubPropConfigs = props.filter(
    propConfig => typeof propConfig.subProps !== 'object',
  );

  return [...propsWithoutSubPropConfigs, ...convertedPropConfigs];
};
