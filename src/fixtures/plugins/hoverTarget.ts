import { PluginConfig } from '../../types/plugin-config';

export const hoverTargetPlugin: PluginConfig = {
  name: 'hoverTarget',
  type: 'selector',
  affixType: 'prefix',
  modifiers: {
    hoverItem: {
      separator: '-',
      identifier: 'hover-item',
      modifierFn: selector => `hover-target:hover .${selector}`,
    },
  },
};
