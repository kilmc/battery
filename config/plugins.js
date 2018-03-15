import {
  addPercent,
  addViewportHeight,
  addViewportWidth,
  unboundFormatPx
} from '../src/formatters';
import { units } from './units';

const formatPx = unboundFormatPx(units);

const hexToRgba = (hex,opacity) => {
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity/100})`;
};

export const pluginStructure = {
  name: '',
  regexFn: (x) => x,
  values: {
    key: 'value'
  },
  precompiledClasses: {
    className: {
      prop1: 'value',
      prop2: 'value',
    }
  },
  valueModifiers: {
    modifierName: {
      separator: '',
      indicator: '',
      passIndicatorArg: true,
      modifierFn: (x) => x,
    }
  }
};

export const plugins = {
  colors: {
    name: 'colors',
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
    valueModifiers: {
      opacity: {
        separator: '_',
        indicator: '\\d+',
        passIndicatorArg: true,
        modifierFn: (x,y) => hexToRgba(x,y)
      }
    }
  },
  lengthUnits: {
    regexString: '\\d+|-\\d+',
    valueModifiers: {
      baseline: {
        default: true,
        modifierFn: x => formatPx(x,true)
      },
      percent: {
        indicator: 'p',
        modifierFn: x => addPercent(x)
      },
      hardPixel: {
        indicator: 'px',
        modifierFn: x => formatPx(x)
      },
      viewportHeight: {
        indicator: 'vh',
        modifierFn: x => addViewportHeight(x)
      },
      viewportWidth: {
        indicator: 'vw',
        modifierFn: x => addViewportWidth(x)
      },
    }
  },
  integers: {
    regexFn: (x) => `((${x.join('|')})(\\d+|-\\d+))`
  },
  pseudoSelectors: {
    classNameModifiers: {
      hover: {
        indicator: 'hover',
        passIndicatorArg: true,
        modifierFn: (x,y) => addPseudoSelector(x,y)
      },
      focus: {
        indicator: 'focus',
        passIndicatorArg: true,
        modifierFn: (x,y) => addPseudoSelector(x,y)
      }
    }
  }
};