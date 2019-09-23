import { ValuePlugin } from 'types/plugin-config';

export const integerPlugin: ValuePlugin = {
  type: 'pattern',
  name: 'integer',
  identifier: /-?\d{1,4}/,
};
