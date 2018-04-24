// color
// ------------------------------------------------------------------
const color = {
  prop: 'color',
  propName: '',
  pluginDefault: true,
  allowedValues: ['red-500', 'grey-900', 'green-800'],
  allowedPseudoValues: {
    hover: [],
  },
  enableColors: true
};

// background-color
// ------------------------------------------------------------------
const backgroundColor = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  keywordValues: {
    separator: '-',
    values: {
      transparent: 'transparent'
    }
  },
  enableColors: true
};

// background-image
// ------------------------------------------------------------------
const backgroundImage = {
  prop: 'background-image',
  propName: 'bg',
  keywordValues: {
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
  keywordValues: {
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
  keywordValues: {
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
  keywordValues: {
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
const borders = {
  prop: 'border',
  propName: 'border',
  subPropSeparator: '-',
  subProps: {
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'x': 'left right',
    'y': 'top bottom'
  },
  keywordValues: {
    separator: '-',
    values: {
      'default': '1px solid #DCDEDD',
      'none': 'none'
    }
  },
  enableIntegers: true
};
const borderColor = {
  prop: 'border-color',
  propName: 'border',
  enableColors: true
};

const borderWidth = {
  prop: 'border-width',
  propName: 'border',
  enableLengthUnits: true
};
const borderRadius = {
  prop: 'border-radius',
  propName: '',
  keywordValues: {
    values: {
      'rounded': '0.2rem',
      'circle': '100%'
    }
  }
};

// box-shadow
// ------------------------------------------------------------------
const boxShadow = {
  prop: 'box-shadow',
  propName: 'shadow',
  keywordValues: {
    separator: '-',
    values: {
      1: '0 2px rgba(0,0,0,0.12)',
      2: '0 3px 6px 1px rgba(0,0,0,0.17)'
    }
  }
};

// box-sizing
// ------------------------------------------------------------------
const boxSizing = {};

// clear
// ------------------------------------------------------------------
const clear = {
  prop: 'clear',
  propName: 'clear',
  keywordValues: {
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
  keywordValues: {
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
  enableColors: true
};

// flex
// ------------------------------------------------------------------
const flexGrow = {
  propName: 'grow',
  prop: 'flex-grow',
  enableIntegers: true
};

const flexShrink = {
  propName: 'shrink',
  prop: 'flex-shrink',
  enableIntegers: true
};
const order = { propName: 'order', prop: 'order' };

const justifyContent = {
  propName: 'justify',
  prop: 'justify-content',
  keywordValues: {
    separator: '-',
    values: {
      'center': 'center',
      'end': 'flex-end',
      'start': 'flex-start',
      'between': 'space-between',
      'around': 'space-around'
    }
  }
};

const alignItems = {
  propName: 'items',
  prop: 'align-items',
  keywordValues: {
    separator: '-',
    values: {
      center: 'center',
      end: 'flex-end',
      start: 'flex-start',
      baseline: 'baseline',
      stretch: 'stretch'
    }
  }
};

const flexDirection = {
  prop: 'flex-direction',
  propName: 'flex',
  keywordValues: {
    separator: '-',
    values: {
      row: 'row',
      column: 'column',
    }
  }
};

// float
// ------------------------------------------------------------------
const float = {
  prop: 'float',
  propName: '',
  keywordValues: {
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
  propName: 'fz',
  enableLengthUnits: true
};

// font-family
// ------------------------------------------------------------------
const fontFamily = {
  prop: 'font-family',
  propName: '',
  keywordValues: {
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
const fontWeight = {
  prop: 'font-weight',
  propName: '',
  keywordValues: {
    values: {
      medium: '400'
    }
  }
};

// height
// ------------------------------------------------------------------
const height = {
  prop: 'height',
  propName: 'h',
  enableLengthUnits: true
};

const minHeight = {
  prop: 'min-height',
  propName: 'min-h',
  enableLengthUnits: true
};

const maxHeight = {
  prop: 'max-height',
  propName: 'max-h',
  enableLengthUnits: true
};


// letter-spacing
// ------------------------------------------------------------------
const letterSpacing = {};

// line-height
// ------------------------------------------------------------------
const lineHeight = {
  prop: 'line-height',
  propName: 'lh',
  enableLengthUnits: true
};

// list-style
// ------------------------------------------------------------------
const listStyle = {};

// margin
// ------------------------------------------------------------------
const margin = {
  prop: 'margin',
  propName: 'm',
  subProps: {
    't': 'top',
    'r': 'right',
    'b': 'bottom',
    'l': 'left',
    'x': 'left right',
    'y': 'top bottom'
  },
  keywordValues: {
    separator: '-',
    values: { auto: 'auto' }
  },
  enableLengthUnits: true
};

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
const padding = {
  prop: 'padding',
  propName: 'p',
  subProps: {
    't': 'top',
    'r': 'right',
    'b': 'bottom',
    'l': 'left',
    'x': 'left right',
    'y': 'top bottom'
  },
  enableLengthUnits: true
};

// pointer-events
// ------------------------------------------------------------------
const pointerEvents = {};

// position
// ------------------------------------------------------------------
const position = {
  prop: 'position',
  propName: '',
  keywordValues: {
    values: {
      'absolute': 'absolute',
      'relative': 'relative',
      'fixed': 'fixed',
      'sticky': 'sticky'
    }
  }
};

const top = {
  prop: 'top',
  propName: 't',
  enableLengthUnits: true
};

const right = {
  prop: 'right',
  propName: 'r',
  enableLengthUnits: true
};

const bottom = {
  prop: 'bottom',
  propName: 'b',
  enableLengthUnits: true
};

const left = {
  prop: 'left',
  propName: 'l',
  enableLengthUnits: true
};

// resize
// ------------------------------------------------------------------
const resize = {};

// stroke
// ------------------------------------------------------------------
const stroke = {
  prop: 'stroke',
  propName: 'stroke',
  enableColors: true
};

// text-align
// ------------------------------------------------------------------
const textAlign = {};

// text-decoration
// ------------------------------------------------------------------
const textDecoration = {
  prop: 'text-decoration',
  propName: 'text',
  keywordValues: {
    separator: '-',
    values: {
      'underline': 'underline',
      'decoration-none': 'none'
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
const width = {
  prop: 'width',
  propName: 'w',
  enableLengthUnits: true
};

const minWidth = {
  prop: 'min-width',
  propName: 'min-w',
  enableLengthUnits: true
};

const maxWidth = {
  prop: 'max-width',
  propName: 'max-w',
  enableLengthUnits: true
};

// word-break
// ------------------------------------------------------------------
const wordBreak = {};

// z-index
// ------------------------------------------------------------------
const zIndex = {
  propName: 'z',
  prop: 'z-index',
  enableIntegers: true
};

const propsConfig = {
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
  padding,
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
  borders,
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
  top,
  right,
  bottom,
  left,
  resize,
  textAlign,
  textDecoration,
  textOverflow,
  textTransform,
  verticalAlign,
  webkit,
  whiteSpace,
  wordBreak,
  zIndex,
  justifyContent,
  alignItems,
  flexDirection
};

export default propsConfig;
