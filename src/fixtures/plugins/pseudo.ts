import { BatteryPlugin } from './../../battery-plugin';

export const pseudoPlugin = BatteryPlugin({
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
});
