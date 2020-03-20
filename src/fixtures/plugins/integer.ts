import { PluginConfig } from 'types/plugin-config';

export const integerPlugin: PluginConfig = {
  type: 'pattern',
  name: 'integer',
  identifier: /-?\d{1,4}/,
};
