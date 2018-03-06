// Utils
// ------------------------------------------------------------------

export const capitalize = (key) => key
  .replace(
    key.charAt(0),
    key.charAt(0).toUpperCase()
  );

export const filterObject = (filterFn, obj) => Object.keys(obj)
  .map(x => obj[x])
  .filter(filterFn);

export const subtractArrays = (arr1,arr2) => {
  let returnArr = arr1;

  arr2.map(remove => {
    const index = arr1.indexOf(remove);
    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
};

// Helpers
// ------------------------------------------------------------------

export const generateRegexGroups = (groupName,arr,regexFn) => {
  const sorted = arr.reduce((xs,x) => {
    const charCount = x.length;

    if (!xs[charCount]) {
      xs[charCount] = { [groupName]: [x] };
    } else {
      xs[charCount][groupName].push(x);
    }
    return xs;
  },{});

  Object.keys(sorted).forEach(x => {
    sorted[x][groupName] = regexFn(sorted[x][groupName]);
  });
  return sorted;
};

export const groupFilter = (arr,regexGroups) => {
  Object.keys(regexGroups).reduce((accum, group) => {
    const matches = arr.filter(regexGroups[group]);
    return accum.concat(matches);
  },[]);
};

// Plugin Helpers
// ------------------------------------------------------------------
export const enablePluginKey = (key) => `enable${capitalize(key)}`;

export const getPluginConfigs = (featureName, propConfigs) => filterObject(
  prop => prop[enablePluginKey(featureName)] === true,
  propConfigs
);

// Converters
// ------------------------------------------------------------------

export const generateAtom = ({
  className,
  cssProps,
  value,
}) => {
  const eachProp = cssProps
    .split(' ')
    .reduce((props,prop) => {
      props[prop] = value;
      return props;
    },{});
  return ( { [className]: eachProp } );
};

// Pre compile
// ------------------------------------------------------------------

export const precompileClasses = (props) => (
  Object.keys(props)
    .map(prop => props[prop])
    .filter(propConfig => typeof propConfig.keywordValues === 'object' )
    .reduce((accumClassNames, propConfig) => {

      const {
        prop,
        propName,
        keywordValues: {
          separator = '',
          values
        }
      } = propConfig;

      const classNames = Object.keys(values)
        .reduce((accumAtoms,valueName) => {
          accumAtoms = {
            ...accumAtoms,
            ...generateAtom({
              className: `${propName}${separator}${valueName}`,
              cssProps: prop,
              value: values[valueName]
            })
          };

          return accumAtoms;
        },{});

      accumClassNames = {
        ...accumClassNames,
        ...classNames
      };
      return accumClassNames;
    },{})
);

// Build regexes
// ------------------------------------------------------------------
const generatePropNamesArr = (valuePlugins,props) => Object.keys(valuePlugins)
  .reduce((accum,pluginName) => {
    const pluginProps = getPluginConfigs(pluginName, props);
    const pluginPropNames = pluginProps.map(x => x.propName);

    if (pluginPropNames.length !== 0) {
      accum[pluginName] = pluginProps.map(x => {
        const { propName, separator = '' } = x;
        return propName + separator;
      });
    }

    return accum;
  },{});

const hasX = (obj,matchFn) => Object.keys(obj)
  .map(x => obj[x])
  .some(matchFn);

const hasLookupValues = (valuePlugins) =>
  hasX(valuePlugins,x => x.values);


const sorterRegexGroups = (valuePlugins,pluginProps,lookupValueGroups) => {
  return Object.keys(pluginProps)
    .reduce((accum,plugin) => {
      let pluginRegexFn;
      const props = pluginProps[plugin];

      if (lookupValueGroups[plugin]) {
        pluginRegexFn =
          (x) => `(.*?)((${x.join('|')})(${lookupValueGroups[plugin].join('|')}))(.*)`;
      } else {
        pluginRegexFn =
          (x) => `(.*?)((${x.join('|')})(${valuePlugins[plugin].valueRegexString}))(.*)`;
      }
      accum = {
        ...accum,
        ...generateRegexGroups(plugin,props,pluginRegexFn)
      };
      return accum;
    },{});
};



const sortClassNames = (classNames,valuePlugins,props) => {
  let lookupValueGroups;

  const pluginProps = generatePropNamesArr(valuePlugins,props);

  if (hasLookupValues(valuePlugins)) {
    lookupValueGroups = Object.keys(valuePlugins)
      .filter(x => valuePlugins[x].values)
      .reduce((accum,plugin) => {
        const { name, values } = valuePlugins[plugin];

        accum[name] = Object.keys(values);
        return accum;
      },{});
  }

  const sorterRegexes = sorterRegexGroups(valuePlugins,pluginProps,lookupValueGroups);
  console.log(sorterRegexes);

};

export const convertKeywordClassNames = (classNames, precompiledAtoms) => {
  if (!precompiledAtoms) return null;

  const atomKeys = Object.keys(precompiledAtoms);
  const keywordRegex = new RegExp(`(.*?)(${atomKeys.join('|')})(.*)`);

  const matchedClassNames = classNames.filter(x => x.match(keywordRegex));

  const returnedAtoms = matchedClassNames
    .reduce((accum, cx) => {
      const cleanClass = cx.replace(keywordRegex, '$2');

      accum[cx] = precompiledAtoms[cleanClass];
      return accum;
    },{});

  subtractArrays(classNames,matchedClassNames);
  return returnedAtoms;
};

// ------------------------------------------------------------------
// ====================  G E N E R A T E  C S S  ====================
// ------------------------------------------------------------------

export const generateCSS = (classNames,config) => {
  let precompiledAtoms;
  let keywordAtoms;
  let atomObjects = {};

  const { plugins, props, settings } = config;

  if (settings.enableKeywordValues) {
    precompiledAtoms = precompileClasses(props);
    keywordAtoms = convertKeywordClassNames(classNames,precompiledAtoms);
    atomObjects = { ...keywordAtoms };
  }

  const valuePlugins = plugins
    .filter(x => x.type === 'value')
    .reduce((accum,plugin) => {
      accum[plugin.name] = plugin;
      return accum;
    },{});

  console.log(valuePlugins);
  const sortedClassNames = sortClassNames(classNames,valuePlugins,props);

  // console.log(valuePlugins);

};