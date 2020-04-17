import { ModifierFn, Plugin } from 'types/plugin-config';

const pxToRem: ModifierFn = value => `${parseInt(value) / 16}rem`;
const ratio: ModifierFn = value => {
  const convertedValue = `${parseInt(value) * 6}`;

  return pxToRem(convertedValue);
};

export const lengthUnitsPlugin: Plugin = {
  type: 'pattern',
  name: 'lengthUnit',
  identifier: /-?\d+/,
  modifiers: {
    ratio: {
      defaultModifier: true,
      modifierFn: ratio,
    },
    pixels: {
      identifier: 'px',
      modifierFn: pxToRem,
    },
    percent: {
      identifier: 'p',
      modifierFn: value => `${value}%`,
    },
    viewportHeight: {
      identifier: 'vh',
      modifierFn: value => `${value}vh`,
    },
    viewportWidth: {
      identifier: 'vw',
      modifierFn: value => `${value}vw`,
    },
  },
};
