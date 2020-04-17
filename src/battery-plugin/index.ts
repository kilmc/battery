import merge from 'lodash.merge';
import { PluginConfig } from './../types/plugin-config';

/**
 * BatteryPlugin is a higher-order function, that allows extending
 * the base config in a type-safe way. The preferred way of adding /
 * overriding a Battery plugin configuration object, is to wrap it in
 * this function, and pass it the options you want.
 *
 *
 * Example:
 *
 * const colorPlugin = BatteryPlugin({ ... });
 *
 * colorPlugin({ static: { teal: '#008080' } })
 */
export const BatteryPlugin = (baseConfig: PluginConfig) => {
  return (options?: Pick<PluginConfig, 'static'>) => {
    return merge(baseConfig, options);
  };
};
