// ------------------------------------------------------------------
// =====================  U S E R  C O N F I G  =====================
// ------------------------------------------------------------------

// Keyword Objects
// ------------------------------------------------------------------
// These objects are for CSS declarations whose values are keyword.
// Unlike integers and length units which can beprogramatically
// generated, we need an alternate interface to define and configure
// keyword values

const baseFontSizeConfig = 10
const useRems = true;

// ------------------------------------------------------------------
// =====================  F O R M A T T E R S  ======================
// ------------------------------------------------------------------

// A simple function to take length unit string and a number, and
// combine them. This function is curried for re-usability
const addLengthUnit = (unit) => (num) => `${num}${unit}`

// Pre-configured length unit functions for converting numbers
// into length units compatible with CSS standards
const addPercent = addLengthUnit('%');
const addRem = addLengthUnit('rem');
const addPixel = addLengthUnit('px');
const addViewportHeight = addLengthUnit('vh');
const addViewportWidth = addLengthUnit('vw');

// ------------------------------------------------------------------
// =====================  C O N V E R T E R S  ======================
// ------------------------------------------------------------------

// Convert pixel values into their rem equivalent. This can be
// configured by the user if they have reset their body font size
// to something other than 16px or 100%
const pxToRem = (x, baseFontSize = baseFontSizeConfig) => x / baseFontSize;

const hardPixel = (x, remify = useRems) => remify
  ? addRem(pxToRem(x)) : addPixel(x);

const scalar = (x) => addRem((x*6)/baseFontSizeConfig);

// ------------------------------------------------------------------
// ==============  N A M I N G  C O N V E N T I O N S  ==============
// ------------------------------------------------------------------

// Takes in an object and creates a regex to match
// its keys
const regexFromKeys = (fn) => (obj) => {
  const propMatches = Object.keys(obj)
    .map(fn)
    .join("|");
  return new RegExp(`(${propMatches})`);
};

const startRegex = regexFromKeys((x) => `^${x}`)
const endRegex = regexFromKeys((x) => `${x}$`)

// This checks an array for duplicates and returns a new
// array with just those items
const findDuplicates = (arr) => {
  const countMap = arr.reduce((acc, name) => {
    acc[name] = (acc[name] ? acc[name] + 1 : 1)
    return acc
  },{})
  return Object.keys(countMap).filter(name => countMap[name] > 1)
};

// This function is used to generate a list of all
// the duplicate base propnames in the propsConfig

const getDuplicatePropNames = (obj) => {
  const allProps = Object.keys(obj)
    .map(type => Object.keys(obj[type]))
    .reduce((xs, x) => xs.concat(x), []);
  return findDuplicates(allProps);
};

// ------------------------------------------------------------------
// =====================  G E N E R A T O R S  ======================
// ------------------------------------------------------------------

// generateAtom
// ------------------------------------------------------------------
// An atom is an object where the key is the classname and the
// contents are the css declarations for that given atom. atoms are
// evenutally rendered as css.

// Example output:
// { 'mb2': { 'margin-bottom': '1.2rem' } }
// { 'absolute': { 'display': 'absolute' } }
// { 'bg-grey-500': { 'background-color': '#9F9F9F' } }

const generateAtom = ({
	className,
  cssProps,
  value,
}) => {
  const eachProp = cssProps
    .split(' ')
    .reduce((props,prop) => {
  	  props[prop] = value
  	  return props
    },{}
  );
	return ( { [className]: eachProp } )
}

export const backgroundSize = {
  prop: 'background-size',
  propName: 'bg',
  manual: {
    separator: '-',
    values: {
      'cover': 'cover',
      'contain': 'contain',
      'full-height': 'auto 100%',
      'full-width': '100% auto'
    }
  }
}

// Converts a propObject to an atomObjects
export const manualValuesToAtoms = ({
  prop,
  propName,
  manual
}) => {
  const values = Object.keys(manual.values);

  return values.map(value =>
    generateAtom({
      className: `${propName}${manual.separator}${manual[value]}`,
      cssProps: prop,
      value: value
    })
  );
};

// Generates an atomObject from a class
const reverseLookup = (cx) => {
  const pattern = /([a-z]+|[a-z]+-[a-z]+)(\d+|-\d+)/
  const [ , prop, value, ] = cx.match(pattern);

  return generateAtom({
  	className: cx,
    cssProps: propsConfig.lengthUnits[prop],
    value: scalar(value)
  })
};

const classSorter = (filterGroups) => (arr) => {
  const filterGroupKeys = Object.keys(filterGroups);

  return filterGroupKeys.reduce((xs, x) => {
    xs[x] = arr.filter(y => y.match(filterGroups[x]));
    return xs;
  }, {});
};

const pseudoRegexes = {
  hover: new RegExp("hover"),
  focus: new RegExp("focus")
};

const filterColors = classSorter({
  color: regexFromKeys(x => `${x}`)(systemColors)
});

const filterIntegers = classSorter({
  integers: regexFromKeys(x => `^${x}`)(propsConfig.integers)
});


const filterLengthUnits = classSorter({
  lengthUnits: regexFromKeys(x => `^${x}`)(lengthUnitsConfig)
});

const filterResponsiveClasses = classSorter({
  responsive: regexFromKeys(x => `${x}$`)(systemBreakpoints)
});
const filterPseudoClasses = classSorter(pseudoRegexes);

const bigFilters = [
  filterResponsiveClasses,
  filterPseudoClasses,
  filterColors,
  filterIntegers,
  filterLengthUnits
];

const sortAllClasses = arr => {
  let filteringArr = arr;
  let leftovers = {};

  return bigFilters.reduce((xs, x, i) => {
    const filteredClasses = x(filteringArr);
    const allMatchedClasses = Object.keys(filteredClasses)
      .map(y => filteredClasses[y])
      .reduce((zs, z) => zs.concat(z), []);

    allMatchedClasses.map(remove => {
      const index = filteringArr.indexOf(remove);
      if (index !== -1) {
        filteringArr.splice(index, 1);
      }
    });

    if (i <= bigFilters.length) {
      leftovers = { leftovers: filteringArr };
    }
    return Object.assign({}, xs, filteredClasses, leftovers);
  }, {});
};

