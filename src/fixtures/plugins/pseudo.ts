import { PluginConfig } from '../../types/plugin-config';

export const pseudoPlugin: PluginConfig = {
  type: 'selector',
  affixType: 'prefix',
  modifiers: [
    {
      name: 'hover',
      separator: '-',
      identifier: 'hover',
      modifierFn: selector => `${selector}:hover`,
    },
    {
      name: 'focus',
      separator: '-',
      identifier: 'focus',
      modifierFn: selector => `${selector}:focus`,
    },
  ],
};
