export const backgroundColor = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  enableColors: true
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
  enableLengthUnits: true
};

export const color = {
  prop: 'color',
  propName: '',
  pluginDefault: true,
  enableColors: true
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
  keywordValues: {
    separator: '-',
    values: {
      auto: 'auto'
    }
  },
  enableLengthUnits: true
};

export const fill = {
  prop: 'fill',
  propName: 'fill',
  separator: '-',
  enableColors: true
};

export const grow = {
  prop: 'grow',
  propName: 'grow',
  enableIntegers: true
};

export const order = {
  prop: 'order',
  propName: 'order',
  enableIntegers: true
};

export const zIndex = {
  prop: 'z-index',
  propName: 'z',
  enableIntegers: true
};

export const props = {
  backgroundColor,
  backgroundSize,
  color,
  display,
  margin,
  fill,
  grow,
  order,
  zIndex
};