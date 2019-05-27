export default {
  plugins: {
    pattern: [],
    lookup: [],
  },
};

const lengthUnits = {
  type: 'pattern',
  regex: /-?d+{1,4}/,
};

const rem1 = {
  type: 'pattern',
  regex: /-?d+{1,4}px/,
  modifierFn: unit => `${unit * 0.6}px`,
};

const rem2 = {
  identifier: 'px',
  modifierFn: unit => `${unit * 0.6}rem`,
};
