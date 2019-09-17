import { ClassMetaData } from 'types/classname';

export const sum = (x: number, y: number) => x + y;

const input = ['bg-black_30', 'bg-contain', 'hover-bg-white', 'mb2', 'h100vh'];

const processedClassNames: ClassMetaData[] = [
  {
    source: 'bg-black_30',
    explodedSource: {
      propIdentifier: 'bg',
      valueSeparator: '-',
      valueIdentifier: 'black',
      modifierSeparator: '_',
      modifierIdentifier: '30',
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
      propIdentifier: 'bg',
      valueSeparator: '-',
      valueIdentifier: 'contain',
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
      propIdentifier: 'bg',
      valueSeparator: '-',
      valueIdentifier: 'white',
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
      propIdentifier: 'mb',
      valueIdentifier: '2',
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
      propIdentifier: 'h',
      valueIdentifier: '100',
      modifierIdentifier: 'vh',
    },
    property: 'height',
    keyword: false,
    classObject: {
      height: '100vh',
    },
  },
];
