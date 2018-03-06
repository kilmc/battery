// ------------------------------------------------------------------
// =====================  F O R M A T T E R S  ======================
// ------------------------------------------------------------------

// Atom Object
// ------------------------------------------------------------------

export const generateAtom = ({
  className,
  cssProps,
  value,
}) => {
  const eachProp = cssProps
    .split(' ')
    .reduce((props,prop) => {
      props[prop] = value;
      return props;
    },{});
  return ( { [className]: eachProp } );
};


// ------------------------------------------------------------------
// Value Formatters
// ------------------------------------------------------------------

// Length Units Indicators
// ------------------------------------------------------------------

export const addLengthUnit = (unit) => (num) => `${num}${unit}`;

// Pre-configured length unit functions for converting numbers
// into length units compatible with CSS standards
export const addPercent = addLengthUnit('%');
export const addRem = addLengthUnit('rem');
export const addPixel = addLengthUnit('px');
export const addViewportHeight = addLengthUnit('vh');
export const addViewportWidth = addLengthUnit('vw');

// Converters
// ------------------------------------------------------------------
const pxToRem = (x, baseFontSize = 16) => addRem(x/baseFontSize);

export const unboundFormatPx = ({
  baseFontSize,
  baselineUnit,
  useRems,
}) => (x,baseline) => {
  const convertedUnit = baseline ? x*baselineUnit : x;
  return useRems
    ? pxToRem(convertedUnit,baseFontSize)
    : addPixel(convertedUnit);
};

export const formatLengthUnitValue = (length, lengthUnit, config) => {
  const formatPx = unboundFormatPx(config.misc);

  switch (config.units[lengthUnit]) {
    case 'baseline':
      return formatPx(length,true);
    case 'percent':
      return addPercent(length);
    case 'hardPixel':
      return formatPx(length);
    case 'viewportHeight':
      return addViewportHeight(length);
    case 'viewportWidth':
      return addViewportWidth(length);
    default:
      return 'Unknown length unit';
  }
};

// Prefix or Suffix
// ------------------------------------------------------------------

export const formatPrefixOrSuffix = (key,separator,prefixOrSuffix) =>
  prefixOrSuffix === 'prefix'
    ? `${key}${separator}`
    : `${separator}${key}`;


// CSS
// ------------------------------------------------------------------

export const formatBorderProp = (rootProp,subProp) => {
  const [start, end] = rootProp.split('-');
  return `${start}-${subProp}-${end}`;
};
