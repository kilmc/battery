import { UserPropConfig } from 'types/prop-config';

const formatBorderProp = (rootProp: string, subProp: string) => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}` as CSSProps;
};

export const convertSubProps = (props: UserPropConfig[]) => {
  const convertedPropConfigs = props
    .filter(propConfig => typeof propConfig.subProps === 'object')
    .map(propConfig => {
      const {
        prop,
        propIdentifier,
        subProps,
        subPropSeparator = '',
        ...rest
      } = propConfig;

      return Object.values(subProps).reduce(
        (accumPropConfigs, subProp) => {
          const processedSubProp = prop.match('border-')
            ? subProp.map(sub => formatBorderProp(prop, sub)).join(' ')
            : subProp.map(sub => `${prop}-${sub}` as CSSProps).join(' ');

          const newPropConfig: UserPropConfig = {
            prop: processedSubProp as CSSProps,
            propIdentifier: `${propIdentifier}${subPropSeparator}${subProp}`,
            ...rest,
          };

          return accumPropConfigs.concat(newPropConfig);
        },
        [] as UserPropConfig[],
      );
    })
    .reduce((accum, x) => accum.concat(x), []);

  return [...props, ...convertedPropConfigs];
};
