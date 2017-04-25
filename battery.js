// Helpers
const JSONlog = (x) => console.log(JSON.stringify(x, null, 2));

// Utilities
const compose = (...functions) =>
  functions.reduce((f, g) => (...xs) => f(g(...xs)));
const identity = x => x;

// Atomic Utilities
const remify = (x) => x/baseFontSize;
const scaler = (x) => x*baseUnit;

// Atomic Base Config
const baseFontSize = 10;
const baseUnit = 6;



// Generates an object with a value name and a value.
// This can be used to generate classes for any property
// that takes these values

// --------------------------------------------------------
// Values
// --------------------------------------------------------

// Length value generator
// --------------------------------------------------------
const lengthUnits = ({
  values,
  keySuffix = '',
  valueSuffix = '',
  transform = [identity],
  negative = false
}) => {
  return values.reduce((obj, value) => {
    const minus = negative ? '-' : '';
    const transformed = compose(...transform)(value);

    obj[`${minus}${value}${keySuffix}`] = `${minus}${transformed}${valueSuffix}`;
    return obj;
  },{});
};

const percentageValues = [
  0, 5, 10, 15, 20, 25, 30, 33, 40, 50,
  60, 66, 70, 80, 85, 90, 95, 100
];
const scaleMultipliers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20
];
const pixelValues = [1, 2, 3, 4];

const percentageUnits = lengthUnits({
  values: percentageValues,
  keySuffix: "p",
  valueSuffix: '%'
});

const viewportHeightUnits = lengthUnits({
  values: percentageValues,
  keySuffix: "vh",
  valueSuffix: 'vh'
});

const pixelUnits = lengthUnits({
  values: pixelValues,
  keySuffix: "px",
  valueSuffix: 'rem'
});

const scaleUnits = lengthUnits({
  values: scaleMultipliers,
  transform: [remify, scaler],
  valueSuffix: 'rem'
});

// An object containing all the colors in your design system
const systemColors = {
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'gray': '#808080',
  'black': '#000000',
  'red': '#FF0000',
  'maroon': '#800000',
  'yellow': '#FFFF00',
  'olive': '#808000',
  'lime': '#00FF00',
  'green': '#008000',
  'aqua': '#00FFFF',
  'teal': '#008080',
  'blue': '#0000FF',
  'navy': '#000080',
  'fuchsia': '#FF00FF',
  'purple': '#800080'
}

// This looks at the systemColors object and creates a new
// object with a subset of colors
const colors = (array) => {
  return array.reduce((obj, value) => {
    obj[value] = systemColors[value];
    return obj
  },{});
};

const textColors = colors([
  'aqua',
  'teal',
  'blue',
  'navy'
]);

const backgroundColors = colors([
  'white',
  'silver',
  'gray',
  'black',
  'red'
]);

const props = ({
  props,
  subprops,
  propSeparator = '',
  root = true
}) => Object.assign(
  ...Object.entries(props).map(([propName, prop]) => ({
    [prop]: Object.assign(
      root ? { [propName]: [prop] } : {},
      ...Object.entries(subprops)
        .map(formatSubprops({ propName, propSeparator, prop }))
    )
  }))
);

const formatSubprops = ({ propName, propSeparator, prop }) =>
  ([subPropName, subProps]) => ({
    [`${propName}${propSeparator}${subPropName}`]:
      subProps.map((sp) => `${prop}-${sp}`)
});

const paddingProps = props({
  props: {
    'p': 'padding',
    'm': 'margin'
  },
  subprops: {
    't': ['top'],
    'r': ['right'],
    'b': ['bottom'],
    'l': ['left'],
    'x': ['right', 'left'],
    'y': ['top', 'bottom']
  }
});



JSONlog(textColors);
JSONlog(backgroundColors);
JSONlog(percentageUnits);
JSONlog(viewportHeightUnits);
JSONlog(pixelUnits);
JSONlog(paddingProps);
JSONlog(scaleUnits);