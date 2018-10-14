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
      separator: '-',
      modifierFn: size => ({ 'margin-left': `calc(${size}/12 * 100%)` }),
      className: ['offset']
    }
  ]
};
