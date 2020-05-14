import { BatteryPlugin } from './../../battery-plugin';

export const hoverTargetPlugin = BatteryPlugin({
  type: 'selector',
  affixType: 'prefix',
  modifiers: [
    {
      name: 'hoverItem',
      separator: '-',
      identifier: 'hover-item',
      modifierFn: selector => `hover-target:hover .${selector}`,
    },
  ],
});
