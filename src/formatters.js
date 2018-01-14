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
const addPercent = addLengthUnit('%');
const addRem = addLengthUnit('rem');
const addPixel = addLengthUnit('px');
const addViewportHeight = addLengthUnit('vh');
const addViewportWidth = addLengthUnit('vw');

// Converters
// ------------------------------------------------------------------
const pxToRem = (x, baseFontSize = 16) => addRem(x/baseFontSize);

export const unboundFormatPx = (
  baseFontSize,
  useRems,
  baselineUnit
) => (x,baseline) => {
  const convertedUnit = baseline ? x*baselineUnit : x;
  return useRems
    ? pxToRem(convertedUnit,baseFontSize)
    : addPixel(convertedUnit);
};

export const formatLengthUnitValue = (length, lengthUnit, config) => {
  const { baseFontSize, baselineUnit, useRems } = config.misc;
  const formatPx = unboundFormatPx(baseFontSize,useRems,baselineUnit);

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
