import { unboundFormat } from '../src/fixtures/modifierFns';

const format = unboundFormat(10,6,true,true);

const hexToRgba = (hex,opacity) => {
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity/100})`;
};

const formatPseudo = (cx,pseudo) => `${cx}:${pseudo}`;

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
    'white': '#ffffff',
    'pink': '#ff0099',
    'green-800': '#098530',
    'green-700': '#05AF3C',
    'green-500': '#25CB68',
    'green-400': '#2BDE73',
    'blue-600': '#003BFF',
    'blue-500': '#2B60FF',
    'grey-900': '#282828',
    'grey-600': '#656868',
    'grey-500': '#9B9E9E',
    'grey-300': '#DCDEDD',
    'grey-200': '#E8E8E8',
    'grey-100': '#FBFBFA',
    'red-500': '#EF0707',
    'red-400': '#FF5151',
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

export const pseudosPlugin = {
  name: 'pseudos',
  type: 'classname',
  prefixOrSuffix: 'prefix',
  modifiers: [
    {
      name: 'hover',
      separator: '-',
      indicator: 'hover',
      modifierFn: formatPseudo
    },
    {
      name: 'focus',
      separator: '-',
      indicator: 'focus',
      modifierFn: formatPseudo
    }
  ]
};

export const breakpointsPlugin = {
  name: 'breakpoints',
  type: 'atrule',
  atrule: 'media',
  prefixOrSuffix: 'suffix',
  modifiers: [
    {
      name: 'responsiveSmall',
      indicator: 'sm',
      separator: '-',
      condition: '(min-width: 560px)'
    },
    {
      name: 'responsiveMedium',
      indicator: 'md',
      separator: '-',
      condition: '(min-width: 940px)'
    },
    {
      name: 'responsiveLarge',
      indicator: 'lg',
      separator: '-',
      condition: '(min-width: 1040px)'
    }
  ]
};

const pluginsConfig = [
  integersPlugin,
  colorsPlugin,
  lengthUnitsPlugin,
  pseudosPlugin,
  breakpointsPlugin
];

export default pluginsConfig;