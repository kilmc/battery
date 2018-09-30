import { BatteryConfig } from '../types/';

export const formatBorderProp = (rootProp: string, subProp: string): string => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}`;
};

export const convertSubProps = (config: BatteryConfig): BatteryConfig => {
  const { props: propConfigs } = config;

  const subPropConfigs = propConfigs.filter(
    x => typeof x.subProps === 'object'
  );

  const convertedPropConfigs = subPropConfigs
    .map(subPropConfig => {
      const {
        prop,
        propName,
        subProps,
        subPropSeparator = '',
        ...rest
      } = subPropConfig;

      return Object.keys(subProps).reduce((accumPropConfigs, x) => {
        const subProp = subProps[x].split(' ');
        const processedSubProp = prop.match('border-')
          ? subProp.map(y => formatBorderProp(prop, y)).join(' ')
          : subProp.map(y => `${prop}-${y}`).join(' ');

        const newPropConfig = {
          prop: processedSubProp,
          propName: `${propName}${subPropSeparator}${x}`,
          ...rest
        };

        return accumPropConfigs.concat(newPropConfig);
      }, []);
    })
    .reduce((accum, x) => accum.concat(x), []);

  return {
    ...config,
    props: [...config.props, ...convertedPropConfigs]
  };
};

const processPropConfigs = (config: BatteryConfig) => {
  return convertSubProps(config);
};

export const processConfig = (config: BatteryConfig) => {
  return processPropConfigs(config);
};
