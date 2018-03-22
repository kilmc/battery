import { unboundFormat } from './modifierFns';

const format = unboundFormat(10,6,true,true);

const hexToRgba = (hex,opacity) => {
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity/100})`;
};

export const integersPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+'
};

export const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: {
    'black': '#000000',
    'white': '#FFFFFF',
    'pink': '#FF0099'
  },
  valueModifiers: [
    {
      name: 'opacity',
      separator: '_',
      indicator: '\\d+',
      modifierFn: hexToRgba
    }
  ]
};

export const lengthUnitsPlugin = {
  name: 'lengthUnits',
  type: 'pattern',
  valueRegexString: '\\d+|-\\d+',
  valueModifiers: [
    {
      name: 'baseline',
      default: true,
      indicator: '',
      modifierFn: format.baseline
    },
    {
      name: 'percent',
      indicator: 'p',
      modifierFn: format.percent
    },
    {
      name: 'pixel',
      indicator: 'px',
      modifierFn: format.pixel
    },
    {
      name: 'viewport height',
      indicator: 'vh',
      modifierFn: format.viewportHeight
    },
    {
      name: 'viewport width',
      indicator: 'vw',
      modifierFn: format.viewportWidth
    },
  ]
};

export const classNamePlugin = {
  name: 'pseudos',
  type: 'classname'
};

export const pseudosPlugin = {
  name: 'pseudos',
  type: 'classname',
  prefixOrSuffix: 'prefix',
  modifiers: [
    {
      name: 'hover',
      separator: '-',
      indicator: 'hover',
    },
    {
      name: 'focus',
      separator: '-',
      indicator: 'focus',
    }
  ]
};

export const breakpointsPlugin = {
  name: 'breakpoints',
  type: 'atrule',
  prefixOrSuffix: 'suffix',
  modifiers: [
    {
      name: 'responsiveSmall',
      indicator: 'sm',
      separator: '-'
    },
    {
      name: 'responsiveMedium',
      indicator: 'md',
      separator: '-'
    },
    {
      name: 'responsiveLarge',
      indicator: 'lg',
      separator: '-'
    }
  ]
};

export const pluginSet = [
  classNamePlugin,
  colorsPlugin,
  integersPlugin,
];