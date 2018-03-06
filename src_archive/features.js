import { capitalize } from './helpers';

export const enableFeatureKey = (key) => `enable${capitalize(key)}`;

export const getConfigs = (filterFn, config) => Object.keys(config)
  .map(x => config[x])
  .filter(filterFn);

export const getFeatureConfigs = (featureName, propConfigs) => getConfigs(
  prop => prop[enableFeatureKey(featureName)] === true,
  propConfigs
);