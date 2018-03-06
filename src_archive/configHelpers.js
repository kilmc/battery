import { enableFeatureKey } from './features';

export const enablePropFeature = (featureName,propConfigs,propList) => propList
  .reduce((accum,prop) => {
    propConfigs[prop] = {
      ...propConfigs[prop],
      [enableFeatureKey(featureName)]: true
    };
  },{});
