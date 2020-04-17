import { Plugin, ModifierFn } from 'types/plugin-config';

const hexToRgba: ModifierFn = (hex, opacity) => {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${parseInt(opacity) / 100})`;
};

export const colorPlugin: Plugin = {
  type: 'lookup',
  name: 'color',
  values: {
    black: '#000000',
    white: '#FFFFFF',
    pink: '#FF9DD8',
  },
  modifiers: {
    opacity: {
      separator: '_',
      identifier: /\d+/,
      modifierFn: hexToRgba,
    },
  },
};
