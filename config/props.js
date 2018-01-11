import { enablePropFeature } from '../src/configHelpers';

// color
// ------------------------------------------------------------------
const color = {
  prop: 'color',
  propName: '',
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
  manual: {
    separator: '-',
    values: {
      transparent: 'transparent'
    }
  }
};

// background-image
// ------------------------------------------------------------------
const backgroundImage = {
  prop: 'background-image',
  propName: 'bg',
  manual: {
    separator: '-',
    values: {
      none: 'none'
    }
  }
};

// background-position
// ------------------------------------------------------------------
const backgroundPosition = {
  prop: 'background-position',
  propName: 'bg',
  manual: {
    separator: '-',
    values: {
      center: 'center center',
      top: 'center top',
      bottom: 'center bottom',
      left: 'left center',
      right: 'right center'
    }
  }
};

// background-repeat
// ------------------------------------------------------------------
const backgroundRepeat = {
  prop: 'background-repeat',
  propName: 'bg',
  manual: {
    separator: '-',
    values: {
      'no-repeat': 'no-repeat',
    }
  }
};

// background-size
// ------------------------------------------------------------------
const backgroundSize = {
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
};

// border
// ------------------------------------------------------------------
const borderColor = { prop: 'border-color', propName: 'border' };
const borderWidth = { prop: 'border-width', propName: 'border' };
const borderRadius = {};

// box-shadow
// ------------------------------------------------------------------
const boxShadow = {};

// box-sizing
// ------------------------------------------------------------------
const boxSizing = {};

// clear
// ------------------------------------------------------------------
const clear = {
  prop: 'clear',
  propName: 'clear',
  manual: {
    separator: '-',
    values: {
      'left': 'left',
      'right': 'right',
      'both': 'both'
    }
  }
};

// cursor
// ------------------------------------------------------------------
const cursor = {};

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
  propName: 'fill',
};

// flex
// ------------------------------------------------------------------
const flexGrow = { propName: 'grow', prop: 'flex-grow' };
const flexShrink = { propName: 'shrink', prop: 'flex-shrink' };
const order = { propName: 'order', prop: 'order' };

// float
// ------------------------------------------------------------------
const float = {
  prop: 'float',
  propName: '',
  manual: {
    values: {
      'left': 'left',
      'right': 'right',
      'float-none': 'none'
    }
  }
};

// font-size
// ------------------------------------------------------------------
const fontSize = {
  prop: 'font-size',
  propName: 'type',
  allowedValues: [
    '132','100','66','60','48','38','34','28',
    '24','21','18','16','14','13','12','10'
  ]
};

// font-family
// ------------------------------------------------------------------
const fontFamily = {
  prop: 'font-family',
  propName: '',
  manual: {
    values: {
      'sans-serif': 'sans-serif'
    }
  }
};

// font-style
// ------------------------------------------------------------------
const fontStyle = {};

// font-weight
// ------------------------------------------------------------------
const fontWeight = {};

// height
// ------------------------------------------------------------------
const height = {
  prop: 'height',
  propName: 'h'
};

const minHeight = {
  prop: 'min-height',
  propName: 'min-h'
};

const maxHeight = {
  prop: 'max-height',
  propName: 'max-h'
};


// letter-spacing
// ------------------------------------------------------------------
const letterSpacing = {};

// line-height
// ------------------------------------------------------------------
const lineHeight = {};

// list-style
// ------------------------------------------------------------------
const listStyle = {};

// margin
// ------------------------------------------------------------------
const margin = {
  prop: 'margin',
  propName: 'm'
};

const marginTop = { prop: 'margin-top', propName: 'mt' };
const marginRight = { prop: 'margin-right', propName: 'mr' };
const marginBottom = { prop: 'margin-bottom', propName: 'mb' };
const marginLeft = { prop: 'margin-left', propName: 'ml' };
const marginX = { prop: 'margin-left margin-right', propName: 'mx' };
const marginY = { prop: 'margin-top margin-bottom', propName: 'my' };

// opacity
// ------------------------------------------------------------------
const opacity = {};

// outline
// ------------------------------------------------------------------
const outline = {};

// overflow
// ------------------------------------------------------------------
const overflow = {};

// padding
// ------------------------------------------------------------------
const padding = { prop: 'padding', propName: 'p' };
const paddingTop = { prop: 'padding-top', propName: 'pt' };
const paddingRight = { prop: 'padding-right', propName: 'pr' };
const paddingBottom = { prop: 'padding-bottom', propName: 'pb' };
const paddingLeft = { prop: 'padding-left', propName: 'pl' };
const paddingX = { prop: 'padding-left padding-right', propName: 'px' };
const paddingY = { prop: 'padding-top padding-bottom', propName: 'py' };

// pointer-events
// ------------------------------------------------------------------
const pointerEvents = {};

// position
// ------------------------------------------------------------------
const position = {
  prop: 'position',
  propName: '',
  manual: {
    values: {
      'absolute': 'absolute',
      'relative': 'relative',
      'fixed': 'fixed'
    }
  }
};

// resize
// ------------------------------------------------------------------
const resize = {};

// stroke
// ------------------------------------------------------------------
const stroke = { prop: 'stroke', propName: 'stroke' };

// text-align
// ------------------------------------------------------------------
const textAlign = {};

// text-decoration
// ------------------------------------------------------------------
const textDecoration = {
  prop: 'text-decoration',
  propName: 'text',
  manual: {
    separator: '-',
    values: {
      'underline': 'underline'
    }
  }
};

// text-overflow
// ------------------------------------------------------------------
const textOverflow = {};

// text-transform
// ------------------------------------------------------------------
const textTransform = {};

// vertical-align
// ------------------------------------------------------------------
const verticalAlign = {};

// webkit
// ------------------------------------------------------------------
const webkit = {};

// white-space
// ------------------------------------------------------------------
const whiteSpace = {};

// width
// ------------------------------------------------------------------
const width = { prop: 'width', propName: 'w' };
const minWidth = { prop: 'min-width', propName: 'min-w' };
const maxWidth = { prop: 'max-width', propName: 'max-w' };

// word-break
// ------------------------------------------------------------------
const wordBreak = {};

// z-index
// ------------------------------------------------------------------
const zIndex = { propName: 'z', prop: 'z-index' };

let propsConfig = {
  color,
  backgroundColor,
  borderColor,
  fill,
  stroke,
  backgroundSize,
  borderWidth,
  height,
  minHeight,
  maxHeight,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  paddingX,
  paddingY,
  width,
  minWidth,
  maxWidth,
  flexGrow,
  flexShrink,
  order,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  borderRadius,
  boxShadow,
  boxSizing,
  clear,
  cursor,
  display,
  float,
  fontSize,
  fontFamily,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  listStyle,
  opacity,
  outline,
  overflow,
  pointerEvents,
  position,
  resize,
  textAlign,
  textDecoration,
  textOverflow,
  textTransform,
  verticalAlign,
  webkit,
  whiteSpace,
  wordBreak,
  zIndex
};

enablePropFeature('colors',propsConfig,[
  'color',
  'backgroundColor',
  'fill',
  'stroke'
]);

enablePropFeature('lengthUnits',propsConfig,[
  'height',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginX',
  'marginY',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingX',
  'paddingY',
  'width',
]);

enablePropFeature('integers',propsConfig,[
  'flexGrow',
  'flexShrink',
  'order',
  'zIndex'
]);

export default propsConfig;
