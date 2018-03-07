export const generateRegexSequencer = (groupName,arr,regexFn) => {
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

export const generatePluginRegexSequencer = (plugins,propNames,lookupValueGroups) => {
  return Object.keys(propNames)
    .reduce((accum,plugin) => {
      const props = propNames[propNames];
      let pluginRegexFn;

      if (lookupValueGroups) {
        pluginRegexFn =
        (x) => `(.*?)(${x.join('|')})?(${lookupValueGroups[plugin].join('|')})(.*)`;
      } else {
        pluginRegexFn =
          (x) => `(.*?)(${x.join('|')})?(${plugins[plugin].valueRegexString})(.*)`;
      }

      accum = {
        ...accum,
        ...generateRegexSequencer(plugin,props,pluginRegexFn)
      };
      return accum;
    },{});
};