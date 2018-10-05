export const addLengthUnit = unit => num => `${num}${unit}`;

// Pre-configured length unit functions for converting numbers
// into length units compatible with CSS standards
export const addPercent = addLengthUnit('%');
export const addRem = addLengthUnit('rem');
export const addPixel = addLengthUnit('px');
export const addViewportHeight = addLengthUnit('vh');
export const addViewportWidth = addLengthUnit('vw');

// Converters
// ------------------------------------------------------------------
const pxToRem = (x, baseFontSize = 16) => addRem(x / baseFontSize);

export const unboundFormatPx = ({
  baseFontSize,
  baselineUnit,
  useRems,
  useBaseline
}) => x => {
  const convertedUnit = useBaseline ? x * baselineUnit : x;
  return useRems
    ? pxToRem(convertedUnit, baseFontSize)
    : addPixel(convertedUnit);
};

export const unboundFormat = (
  baseFontSize,
  baselineUnit,
  useRems,
  useBaseline
) => ({
  percent: addPercent,
  rem: addRem,
  pixel: unboundFormatPx({ baseFontSize, baselineUnit, useRems }),
  viewportHeight: addViewportHeight,
  viewportWidth: addViewportWidth,
  baseline: unboundFormatPx({
    baseFontSize,
    baselineUnit,
    useRems,
    useBaseline
  })
});
