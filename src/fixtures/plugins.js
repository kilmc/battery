export const integersPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '(\\d+|-\\d+)'
};

export const colorsPlugin = {
  name: 'colors',
  type: 'lookup',
  values: {
    'black': '#000000',
    'white': '#ffffff',
    'pink': '#ff0099'
  },
  valueModifiers: {
    opacity: {
      separator: '_',
      indicator: '\\d+',
      modifierFn: () => {}
    }
  }
};

export const lengthUnitsPlugin = {
  name: 'lengthUnits',
  type: 'pattern',
  valueRegexString: '(\\d+|-\\d+)'
};

export const classNamePlugin = {
  name: 'pseudos',
  type: 'classname',
};

export const pluginSet = [
  classNamePlugin,
  colorsPlugin,
  integersPlugin,
];