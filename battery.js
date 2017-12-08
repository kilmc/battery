// ------------------------------------------------------------------
// =====================  U S E R  C O N F I G  =====================
// ------------------------------------------------------------------

// CSS Properties
// ------------------------------------------------------------------

const propsConfig = {
  color: {
    'text': 'color',
    'bg': 'background-color',
    'fill': 'fill',
    'stroke': 'stroke',
    'border': 'border-color'
  },
  lengthUnits: {
    'bg': 'background-size',
    'border': 'border-width',
    'm': 'margin',
    'mt': 'margin-top',
    'mr': 'margin-right',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mx': 'margin-left margin-right',
    'my': 'margin-top margin-bottom',
    'p': 'padding',
    'pt': 'padding-top',
    'pr': 'padding-right',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'h': 'height',
    'min-h': 'min-height',
    'max-h': 'max-height',
    'w': 'width',
    'min-w': 'min-width',
    'max-w': 'max-width'
  },
  integers: {
    'grow': 'flex-grow',
    'order': 'order',
    'shrink': 'flex-shrink',
    'z': 'z-index'
  }
}

['Kilian','Robert','Sarah','Robert']

// Keyword Objects
// ------------------------------------------------------------------
// These objects are for CSS declarations whose values are keyword.
// Unlike integers and length units which can beprogramatically
// generated, we need an alternate interface to define and configure
// keyword values

const keywordConfig = [
  // Display
  {
    prop: 'display',
    propName: '',
    values: {
      'block': 'block',
      'inline': 'inline',
      'inline-block': 'inline-block',
      'flex': 'flex',
      'inline-flex': 'inline-flex'
    }
  },
  // Position
  {
    prop: 'position',
    propName: '',
    values: {
      'absolute': 'absolute',
      'relative': 'relative',
      'fixed': 'fixed'
    }
  }
]

// Length Units
// ------------------------------------------------------------------

const unitsConfig = {
  '': 'baseline',
  'p': 'percent',
  'px': 'hardPixel',
  'vh': 'viewportHeight',
  'vw': 'viewportWidth'
};

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

const scalar = (x) => addRem((x*6)/10);

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
//
// Reasoning: We use certain prefixes bg prefix to target
// multiple properties. The bg prefix is a good example of this.
// The values you reference after bg gives you context to which
// property the bg prefix is mapped to. In the case of bg25p that maps to
// background-position, but bg-none would map to background-image and
// bg-cover would map to the background-size keyword value of cover.
//
// I'm trying to think through potential issues and so was just
// experimenting with potential ways of determining what names
// and naming conventions are tied to what properties.

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

// Converts a keywordObject to an atomObjects
const keywordToAtom = (obj) => {
  const values = Object.keys(obj.values);

  return values.map(value => generateAtom({
    className: `${obj.propName}${obj.values[value]}`,
    cssProps: obj.prop,
    value: value
  }));
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
}