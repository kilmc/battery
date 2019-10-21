import { UserPropConfig, SubPropKeys } from 'types/prop-config';
import { CSSProps } from 'types/css-props';

const formatBorderProp = (rootProp: string, subProp: string) => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}` as CSSProps;
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

const processedProp = (propsArr: string[], baseProp: CSSProps) => {
  if (propsArr.length === 0) {
    return [baseProp];
  }
  return propsArr.every(p => !!p.match('border-'))
    ? propsArr.map(subProp => formatBorderProp(baseProp, subProp))
    : propsArr.map(subProp => `${baseProp}-${subProp}` as CSSProps);
};

export const convertSubProps = (props: UserPropConfig[]) => {
  const convertedPropConfigs = props
    .filter(propConfig => typeof propConfig.subProps === 'object')
    .map(propConfig => {
      const subPropsConfig = propConfig.subProps;
      const generatedConfigs = Object.entries(subPropsConfig).reduce(
        (accum, [subPropGroup, subPropIdentifier]: [SubPropKeys, string]) => {
          const {
            propIdentifier,
            subProps,
            subPropSeparator = '',
            prop,
            ...rest
          } = propConfig;

          const newProp = processedProp(subPropMapper[subPropGroup], prop[0]);

          const newPropIdentifier = `${propIdentifier}${subPropSeparator}${subPropIdentifier}`;
          const newPropConfig = {
            prop: newProp,
            propIdentifier: newPropIdentifier,
            ...rest,
          };
          return accum.concat(newPropConfig);
        },
        [] as UserPropConfig[],
      );
      return generatedConfigs;
    })
    .reduce((xs, x) => xs.concat(x), []);

  const propsWithoutSubPropConfigs = props.filter(
    propConfig => typeof propConfig.subProps !== 'object',
  );

  return [...propsWithoutSubPropConfigs, ...convertedPropConfigs];
};
