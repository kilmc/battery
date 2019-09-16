import { ValuePlugin } from 'types/plugin-config';

export const integers: ValuePlugin = {
  type: 'pattern',
  name: 'integers',
  identifier: /-?\d+{1,4}/,
};
