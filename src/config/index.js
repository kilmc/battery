function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const formatBorderProp = (rootProp,subProp) => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}`;
};

export const convertSubProps = (config) => {
  const { props: propsConfigs } = config;

  const subPropConfigs = Object.keys(propsConfigs)
    .map(x => propsConfigs[x])
    .filter(x => typeof x.subProps === 'object');

  const convertedPropConfigs = subPropConfigs
    .map(subPropConfig => {
      const { prop, propName, subProps, subPropSeparator = '', ...rest } = subPropConfig;

      return Object.keys(subProps)
        .reduce((accumPropConfigs, x) => {
          const propConfigName = camelize(`${prop} ${subProps[x]}`);
          const subProp = subProps[x].split(' ');
          const processedSubProp = prop.match('border')
            ? subProp.map(y => formatBorderProp(prop,y)).join(' ')
            : subProp.map(y => `${prop}-${y}`).join(' ');

          accumPropConfigs[propConfigName] = {
            prop: processedSubProp,
            propName: `${propName}${subPropSeparator}${x}`,
            ...rest
          };

          return accumPropConfigs;
        },{});
    }).reduce((accum,x) => accum = { ...accum, ...x },{});

  return {
    ...config,
    props: { ...config.props, ...convertedPropConfigs }
  };
};


const processPropConfigs = (config) => {
  return convertSubProps(config);
};

export const processConfig = (config) => {
  return processPropConfigs(config);
};
