// color
// ------------------------------------------------------------------
const color = {
  prop: 'color',
  propName: '',
  enableColors: true,
  allowedValues: ['red-500', 'grey-900', 'green-800'],
  allowedPseudoValues: {
    hover: [],
  }
};

// background-color
// ------------------------------------------------------------------
const backgroundColor = {
  prop: 'background-color',
  propName: 'bg',
  enableColors: true,
  auto: {
    allowedClasses: [ 'red-500', 'grey-900', 'green-800' ],
    allowedAutoPseudoClasses: {
      hover: []
    }
  }
};

// background-image
// ------------------------------------------------------------------
const backgroundImage = {}

// background-position
// ------------------------------------------------------------------
const backgroundPosition = {}

// background-repeat
// ------------------------------------------------------------------
const backgroundRepeat = {}

// background-size
// ------------------------------------------------------------------
const backgroundSize = {
  prop: 'background-size',
  propName: 'bg',
  enableLengthUnits: true,
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

// border
// ------------------------------------------------------------------
const borderColor = { prop: 'border-color', propName: "border"};
const borderWidth = { prop: 'border-width', propName: 'border'}
const borderRadius = {}

// box-shadow
// ------------------------------------------------------------------
const boxShadow = {}

// box-sizing
// ------------------------------------------------------------------
const boxSizing = {}

// clear
// ------------------------------------------------------------------
const clear = {}

// cursor
// ------------------------------------------------------------------
const cursor = {}

// display
// ------------------------------------------------------------------
const display = {
  prop: 'display',
  propName: '',
  manual: {
    values: {
      'block': 'block',
      'inline': 'inline',
      'inline-block': 'inline-block',
      'flex': 'flex',
      'inline-flex': 'inline-flex'
    }
  }
};

// fill
// ------------------------------------------------------------------
const fill = {
  prop: 'fill',
  propName: "fill",
  enableColors: true
};

// flex
// ------------------------------------------------------------------
const flexGrow = { propName: 'grow', prop: 'flex-grow' };
const flexShrink = { propName: 'shrink', prop: 'flex-shrink' };
const order = { propName: 'order', prop: 'order' };

// float
// ------------------------------------------------------------------
const float = {}

// font-size
// ------------------------------------------------------------------
const fontSize = {
  propName: 'type',
  prop: 'font-size',
  allowedValues: [
    '132','100','66','60','48','38','34','28',
    '24','21','18','16','14','13','12','10'
  ]
};

// font-family
// ------------------------------------------------------------------
const fontFamily = {
  prop: 'font-family',
  propName: ''
}

// font-style
// ------------------------------------------------------------------
const fontStyle = {}

// font-weight
// ------------------------------------------------------------------
const fontWeight = {}

// height
// ------------------------------------------------------------------
const height = { prop: 'height', propName: 'h' }
const minHeight = { prop: 'min-height', propName: 'min-h' }
const maxHeight = { prop: 'max-height', propName: 'max-h' }


// letter-spacing
// ------------------------------------------------------------------
const letterSpacing = {}

// line-height
// ------------------------------------------------------------------
const lineHeight = {}

// list-style
// ------------------------------------------------------------------
const listStyle = {}

// margin
// ------------------------------------------------------------------
const margin = {
  prop: 'margin',
  propName: 'm'
};

const marginTop = { prop: 'margin-top', propName: 'mt' }
const marginRight = { prop: 'margin-right', propName: 'mr' }
const marginBottom = { prop: 'margin-bottom', propName: 'mb' }
const marginLeft = { prop: 'margin-left', propName: 'ml' }
const marginX = { prop: 'margin-left margin-right', propName: 'mx' }
const marginY = { prop: 'margin-top margin-bottom', propName: 'my' }

// opacity
// ------------------------------------------------------------------
const opacity = {}

// outline
// ------------------------------------------------------------------
const outline = {}

// overflow
// ------------------------------------------------------------------
const overflow = {}

// padding
// ------------------------------------------------------------------
const padding = { prop: 'padding', propName: 'p' }
const paddingTop = { prop: 'padding-top', propName: 'pt' }
const paddingRight = { prop: 'padding-right', propName: 'pr' }
const paddingBottom = { prop: 'padding-bottom', propName: 'pb' }
const paddingLeft = { prop: 'padding-left', propName: 'pl' }
const paddingX = { prop: 'padding-left padding-right', propName: 'px' }
const paddingY = { prop: 'padding-top padding-bottom', propName: 'py' }

// pointer-events
// ------------------------------------------------------------------
const pointerEvents = {}

// position
// ------------------------------------------------------------------
const position = {
  prop: 'position',
  propName: '',
  values: {
    'absolute': 'absolute',
    'relative': 'relative',
    'fixed': 'fixed'
  }
}

// resize
// ------------------------------------------------------------------
const resize = {}

// stroke
// ------------------------------------------------------------------
const stroke = { prop: 'stroke', propName: "stroke" }

// text-align
// ------------------------------------------------------------------
const textAlign = {}

// text-decoration
// ------------------------------------------------------------------
const textDecoration = {}

// text-overflow
// ------------------------------------------------------------------
const textOverflow = {}

// text-transform
// ------------------------------------------------------------------
const textTransform = {}

// vertical-align
// ------------------------------------------------------------------
const verticalAlign = {}

// webkit
// ------------------------------------------------------------------
const webkit = {}

// white-space
// ------------------------------------------------------------------
const whiteSpace = {}

// width
// ------------------------------------------------------------------
const width = { prop: 'width', propName: 'w' }
const minWidth = { prop: 'min-width', propName: 'min-w' }
const maxWidth = { prop: 'max-width', propName: 'max-w' }

// word-break
// ------------------------------------------------------------------
const wordBreak = {}

// z-index
// ------------------------------------------------------------------
const zIndex = { propName: 'z', prop: 'z-index' };


const propsConfig = {
  color,
  backgroundColor,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  borderColor,
  borderWidth,
  borderRadius,
  boxShadow,
  boxSizing,
  clear,
  cursor,
  display,
  fill,
  flexGrow,
  flexShrink,
  order,
  float,
  fontSize,
  fontFamily,
  fontStyle,
  fontWeight,
  height,
  minHeight,
  maxHeight,
  letterSpacing,
  lineHeight,
  listStyle,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  opacity,
  outline,
  overflow,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingX,
  paddingY,
  pointerEvents,
  position,
  resize,
  stroke,
  textAlign,
  textDecoration,
  textOverflow,
  textTransform,
  verticalAlign,
  webkit,
  whiteSpace,
  width,
  minWidth,
  maxWidth,
  wordBreak,
  zIndex
};

export default propsConfig;
