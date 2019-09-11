import { ClassNameMeta } from 'types/classname';

export const sum = (x: number, y: number) => x + y;

const input = ['bg-black_30', 'bg-contain', 'hover-bg-white', 'mb2', 'h100vh'];

const processedClassNames: ClassNameMeta[] = [
  {
    source: 'bg-black_30',
    explodedSource: {
      propIndicator: 'bg',
      valueSeparator: '-',
      valueIndicator: 'black',
      modifierSeparator: '_',
      modifierIndicator: '30',
    },
    property: 'background-color',
    valuePlugin: 'color:opacity',
    keyword: false,
    classObject: {
      'background-color': 'rgba(0,0,0,0.3)',
    },
  },
  {
    source: 'bg-contain',
    explodedSource: {
      propIndicator: 'bg',
      valueSeparator: '-',
      valueIndicator: 'contain',
    },
    property: 'background-size',
    keyword: true,
    classObject: {
      'background-size': 'contain',
    },
  },
  {
    source: 'hover-bg-white',
    explodedSource: {
      prefix: 'hover',
      prefixSeparator: '-',
      propIndicator: 'bg',
      valueSeparator: '-',
      valueIndicator: 'white',
    },
    property: 'background-color',
    selectorPlugin: 'psuedo:hover',
    keyword: false,
    classObject: {
      'background-color': '#FFFFFF',
    },
  },
  {
    source: 'mb2',
    explodedSource: {
      propIndicator: 'mb',
      valueIndicator: '2',
    },
    property: 'margin-bottom',
    valuePlugin: 'lengthUnit:baseline',
    keyword: false,
    classObject: {
      'margin-bottom': '1.2rem',
    },
  },
  {
    source: 'h100vh',
    explodedSource: {
      propIndicator: 'h',
      valueIndicator: '100',
      modifierIndicator: 'vh',
    },
    property: 'height',
    keyword: false,
    classObject: {
      height: '100vh',
    },
  },
];
