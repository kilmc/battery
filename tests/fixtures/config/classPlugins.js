export const gridCol = {
  name: 'grid-col',
  type: 'class',
  className: ['col'],
  modifiers: [
    {
      regex: '\\d+',
      separator: '-',
      modifierFn: size => ({ width: `calc(${size}/12 * 100%)` })
    },
    {
      regex: '\\d+',
      regexSeparator: '-',
      separator: '-',
      modifierFn: size => ({ 'margin-left': `calc(${size}/12 * 100%)` }),
      className: ['offset']
    }
  ]
};

export const squarePlugin = {
  name: 'square',
  type: 'class',
  className: ['square'],
  modifiers: [
    {
      regex: '\\d+',
      modifierFn: size => [`h${size}`, `w${size}`]
    }
  ]
};
