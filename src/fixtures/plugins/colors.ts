import { LookupPlugin, ModifierFn } from 'types/plugin-config';

const hexToRgba: ModifierFn = (hex, opacity) => {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${parseInt(opacity) / 100})`;
};

export const colorPlugin: LookupPlugin = {
  name: 'colors',
  values: {
    black: '#000000',
    white: '#ffffff',
    pink: '#ff9dd8',
  },
  modifiers: [
    {
      name: 'opacity',
      separator: '_',
      indentifier: /\d+/,
      modifierFn: hexToRgba,
    },
  ],
};
