import { convertSubProps } from './converters';

export const config = {
  breakpoints: {
    prefixOrSuffix: 'suffix',
    separator: '-',
    breakpoints: {
      sm: '600px',
      md: '795px',
      lg: '1025px'
    }
  },
  colors: {
    'green-800': '#098530',
    'green-700': '#05AF3C',
    'green-500': '#25CB68'
  },
  css: {
    pseudoSelectors: {
      hover: {
        pseudo: 'hover',
        pseudoName: 'hover',
        separator: '-',
        prefixOrSuffix: 'prefix'
      },
      focus: {
        pseudo: 'focus',
        pseudoName: 'focus',
        separator: '-',
        prefixOrSuffix: 'prefix'
      }
    }
  },
  props: {
    backgroundColor: {
      prop: 'background-color',
      propName: 'bg',
      enableColors: true,
    },
    backgroundSize: {
      prop: 'background-size',
      propName: 'bg',
      enableLengthUnits: true,
      manual: {
        separator: '-',
        values: {
          'cover': 'cover',
          'contain': 'contain',
          'full-height': 'auto 100%',
          'full-width': '100% auto'
        }
      }
    },
    color: {
      prop: 'color',
      propName: '',
      enableColors: true,
    },
    fill: {
      prop: 'fill',
      propName: 'fill',
      enableColors: true,
    },
    grow: {
      prop: 'grow',
      propName: 'grow',
      enableIntegers: true
    },
    margin: {
      prop: 'margin',
      propName: 'm',
      subProps: {
        't': 'top',
        'r': 'right',
        'b': 'bottom',
        'l': 'left',
        'x': 'left right',
        'y': 'top bottom'
      },
      enableLengthUnits: true
    },
    order: {
      prop: 'order',
      propName: 'order',
      enableIntegers: true
    },
    width: {
      prop: 'width',
      propName: 'w',
      enableLengthUnits: true,
    },
    zIndex: {
      prop: 'z-index',
      propName: 'z',
      enableIntegers: true
    },
  },
  misc: {
    baseFontSize: 10,
    baselineUnit: 6,
    useRems: true,
  },
  units: {
    '': 'baseline',
    'p': 'percent',
    'px': 'hardPixel',
    'vh': 'viewportHeight',
    'vw': 'viewportWidth'
  }
};

const processedConfig = convertSubProps(config);

export default processedConfig;