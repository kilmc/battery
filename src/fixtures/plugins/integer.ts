import { PluginConfig } from '../../types/plugin-config';

export const integerPlugin: PluginConfig = {
  type: 'pattern',
  identifier: /-?\d{1,4}/,
};
