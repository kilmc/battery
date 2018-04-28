export const backgroundColor = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  enablePlugin: 'colors'
};

export const backgroundSize = {
  prop: 'background-size',
  propName: 'bg',
  keywordValues: {
    separator: '-',
    values: {
      cover: 'cover',
      contain: 'contain'
    }
  },
  enablePlugin: 'lengthUnits'
};

export const color = {
  prop: 'color',
  propName: '',
  pluginDefault: true,
  enablePlugin: 'colors'
};

export const display = {
  prop: 'display',
  propName: '',
  keywordValues: {
    values: {
      block: 'block',
      inline: 'inline',
      flex: 'flex'
    }
  }
};

export const margin = {
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
  keywordValues: {
    separator: '-',
    values: {
      auto: 'auto'
    }
  },
  enablePlugin: 'lengthUnits'
};

export const fill = {
  prop: 'fill',
  propName: 'fill',
  separator: '-',
  enablePlugin: 'colors'
};

export const grow = {
  prop: 'grow',
  propName: 'grow',
  enablePlugin: 'integers'
};

export const order = {
  prop: 'order',
  propName: 'order',
  enablePlugin: 'integers'
};

export const zIndex = {
  prop: 'z-index',
  propName: 'z',
  enablePlugin: 'integers'
};

export const props = [
  backgroundColor,
  backgroundSize,
  color,
  display,
  margin,
  fill,
  grow,
  order,
  zIndex
];