export const enablePropFeature = (featureName, propConfigs,propList) => {
  const enableBucket = _.camelCase(`enable ${featureName}`);

  propList
    .reduce((accum,prop) => {
      propConfigs[prop] = {
        ...propConfigs[prop],
        [enableBucket]: true
      }
    },{})
};
