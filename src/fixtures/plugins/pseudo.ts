import { Plugin } from 'types/plugin-config';

export const pseudoPlugin: Plugin = {
  name: 'pseudo',
  type: 'selector',
  affixType: 'prefix',
  modifiers: {
    hover: {
      separator: '-',
      identifier: 'hover',
      modifierFn: selector => `${selector}:hover`,
    },
    focus: {
      separator: '-',
      identifier: 'focus',
      modifierFn: selector => `${selector}:focus`,
    },
  },
};
