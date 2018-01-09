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
      props[prop] = value
      return props
    },{})
  return ( { [className]: eachProp } )
}


// ------------------------------------------------------------------
// Value Formatters
// ------------------------------------------------------------------

// Length Units
// ------------------------------------------------------------------

const addLengthUnit = (unit) => (num) => `${num}${unit}`

// Pre-configured length unit functions for converting numbers
// into length units compatible with CSS standards
const addPercent = addLengthUnit('%');
const addRem = addLengthUnit('rem');
const addPixel = addLengthUnit('px');
const addViewportHeight = addLengthUnit('vh');
const addViewportWidth = addLengthUnit('vw');


// Convert pixel values into their rem equivalent. This can be
// configured by the user if they have reset their body font size
// to something other than 16px or 100%
const pxToRem = (x, baseFontSize = 10) => addRem(x/baseFontSize);

const hardPixel = (x,baseFontSize,remify) => remify
  ? pxToRem(x,baseFontSize)
  : addPixel(x);

const baseline = (x,baselineUnit,baseFontSize) =>
  addRem((x*baselineUnit)/baseFontSize);

export const formatLengthUnitValue = (length, lengthUnit, config) => {
  const { baseFontSize, baselineUnit, useRems } = config.misc;

  switch (config.units[lengthUnit]) {
    case 'baseline':
      return baseline(length,baselineUnit,baseFontSize)
    case 'percent':
      return addPercent(length)
    case 'hardPixel':
      return hardPixel(length,baseFontSize,useRems)
    case 'viewportHeight':
      return addViewportHeight(length)
    case 'viewportWidth':
      return addViewportWidth(length)
    default:
      return "Something cool"
  }
};

export const formatPrefixOrSuffix = (key,separator,prefixOrSuffix) =>
  prefixOrSuffix === 'prefix'
    ? `${key}${separator}`
    : `${separator}${key}`
