import { ModifierFn, ValuePlugin } from 'types/plugin-config';

const pxToRem: ModifierFn = value => `${parseInt(value) / 16}rem`;
const ratio: ModifierFn = value => {
  const convertedValue = `${parseInt(value) * 6}`;

  return pxToRem(convertedValue);
};

export const lengthUnitsPlugin: ValuePlugin = {
  type: 'pattern',
  name: 'lengthUnit',
  identifier: /-?\d+/,
  modifiers: [
    {
      name: 'ratio',
      defaultModifier: true,
      modifierFn: ratio,
    },
    {
      name: 'pixels',
      identifier: 'px',
      modifierFn: pxToRem,
    },
    {
      name: 'percent',
      identifier: 'p',
      modifierFn: value => `${value}%`,
    },
    {
      name: 'viewportHeight',
      identifier: 'vh',
      modifierFn: value => `${value}vh`,
    },
    {
      name: 'viewportWidth',
      identifier: 'vw',
      modifierFn: value => `${value}vw`,
    },
  ],
};
