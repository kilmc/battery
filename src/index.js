import {
  sortBreakpoints,
  sortClasses,
} from './sorters';

import {
  atomsToCSS,
  generateMediaQuery
} from './printers'

import {
  colorsConverter,
  lengthUnitsConverter,
  manualClassNameConverter,
  integersConverter,
  addPseudoSelectors
} from './converters'


// ------------------------------------------------------------------
// =======================  G E N E R A T E  ========================
// ------------------------------------------------------------------

export const generate = (arr,config) => {
  const { css, breakpoints } = config;

  const {
    colors,
    lengthUnits,
    manualClasses,
    integers
  } = sortClasses(arr,config);

  const classNamesToAtoms = {
    ...colorsConverter(colors,config),
    ...lengthUnitsConverter(lengthUnits,config),
    ...manualClassNameConverter(manualClasses,config),
    ...integersConverter(integers,config)
  }

  // TODO: Figure out why mutations are happening to classNamesToAtoms

  const processPseudoSelectors =
    addPseudoSelectors(classNamesToAtoms,css.pseudoSelectors)

  const sortedClasses =
    sortBreakpoints(processPseudoSelectors,breakpoints)

  const fourthPassAtoms = (classes) => {
    let cssLibrary;

    cssLibrary = atomsToCSS(classes.all)
    Reflect.deleteProperty(classes,'all')

    const mediaQueries = Object.keys(classes)
      .map(breakpoint =>
        generateMediaQuery(
          classes[breakpoint],
          breakpoint,
          breakpoints.breakpoints
        ))
      .join('\n')

    cssLibrary += mediaQueries

    return cssLibrary
  }

  return fourthPassAtoms(sortedClasses)
}
