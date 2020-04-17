import { PluginConfig } from '../../types/plugin-config';

export const pseudoPlugin: PluginConfig = {
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
