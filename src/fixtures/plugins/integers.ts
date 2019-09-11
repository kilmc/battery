import { PatternPlugin } from 'types/plugin-config';

export const integers: PatternPlugin = {
  name: 'integers',
  identifier: /-?\d+{1,4}/,
};
