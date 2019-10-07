import { Plugin } from 'types/plugin-config';

export const integerPlugin: Plugin = {
  type: 'pattern',
  name: 'integer',
  identifier: /-?\d{1,4}/,
};
