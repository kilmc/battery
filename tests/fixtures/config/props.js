// color
// ------------------------------------------------------------------
export const color = {
  prop: 'color',
  propName: '',
  pluginDefault: true,
  allowedValues: ['black', 'red-500', 'grey-900', 'green-800'],
  enablePlugin: 'colors'
};

// background-color
// ------------------------------------------------------------------
export const backgroundColor = {
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  keywordValues: {
    separator: '-',
    values: {
      transparent: 'transparent'
    }
  },
  enablePlugin: 'colors'
};

// background-image
// ------------------------------------------------------------------
export const backgroundImage = {
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
export const backgroundPosition = {
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
export const backgroundRepeat = {
  prop: 'background-repeat',
  propName: 'bg',
  keywordValues: {
    separator: '-',
    values: {
      'no-repeat': 'no-repeat'
    }
  }
};

// background-size
// ------------------------------------------------------------------
export const backgroundSize = {
  prop: 'background-size',
  propName: 'bg',
  keywordValues: {
    separator: '-',
    values: {
      cover: 'cover',
      contain: 'contain',
      'full-height': 'auto 100%',
      'full-width': '100% auto'
    }
  }
};

// border
// ------------------------------------------------------------------
export const borders = {
  prop: 'border',
  propName: 'border',
  subPropSeparator: '-',
  subProps: {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    x: 'left right',
    y: 'top bottom'
  },
  keywordValues: {
    separator: '-',
    values: {
      default: '1px solid #DCDEDD',
      none: 'none'
    }
  }
};
export const borderColor = {
  prop: 'border-color',
  separator: '-',
  propName: 'border',
  enablePlugin: 'colors'
};

export const borderWidth = {
  prop: 'border-width',
  propName: 'border',
  enablePlugin: 'lengthUnits',
  keywordValues: {
    separator: '-',
    values: {
      thin: '2px'
    }
  }
};
export const borderRadius = {
  prop: 'border-radius',
  propName: '',
  keywordValues: {
    values: {
      rounded: '0.2rem',
      circle: '100%'
    }
  }
};

// box-shadow
// ------------------------------------------------------------------
export const boxShadow = {
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
export const boxSizing = {};

// clear
// ------------------------------------------------------------------
export const clear = {
  prop: 'clear',
  propName: 'clear',
  keywordValues: {
    separator: '-',
    values: {
      left: 'left',
      right: 'right',
      both: 'both'
    }
  }
};

// cursor
// ------------------------------------------------------------------
export const cursor = {};

// display
// ------------------------------------------------------------------
export const display = {
  prop: 'display',
  propName: '',
  keywordValues: {
    values: {
      block: 'block',
      inline: 'inline',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex'
    }
  }
};

// fill
// ------------------------------------------------------------------
export const fill = {
  prop: 'fill',
  propName: 'fill',
  enablePlugin: 'colors'
};

// flex
// ------------------------------------------------------------------
export const flexGrow = {
  propName: 'grow',
  prop: 'flex-grow',
  enablePlugin: 'integers'
};

export const flexShrink = {
  propName: 'shrink',
  prop: 'flex-shrink',
  enablePlugin: 'integers'
};
export const order = { propName: 'order', prop: 'order' };

export const justifyContent = {
  propName: 'justify',
  prop: 'justify-content',
  keywordValues: {
    separator: '-',
    values: {
      center: 'center',
      end: 'flex-end',
      start: 'flex-start',
      between: 'space-between',
      around: 'space-around'
    }
  }
};

export const alignItems = {
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

export const flexDirection = {
  prop: 'flex-direction',
  propName: 'flex',
  keywordValues: {
    separator: '-',
    values: {
      row: 'row',
      column: 'column'
    }
  }
};

// float
// ------------------------------------------------------------------
export const float = {
  prop: 'float',
  propName: '',
  keywordValues: {
    values: {
      left: 'left',
      right: 'right',
      'float-none': 'none'
    }
  }
};

// font-size
// ------------------------------------------------------------------
export const fontSize = {
  prop: 'font-size',
  propName: 'fz',
  enablePlugin: 'lengthUnits'
};

// font-family
// ------------------------------------------------------------------
export const fontFamily = {
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
export const fontStyle = {};

// font-weight
// ------------------------------------------------------------------
export const fontWeight = {
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
export const height = {
  prop: 'height',
  propName: 'h',
  enablePlugin: 'lengthUnits'
};

export const minHeight = {
  prop: 'min-height',
  propName: 'min-h',
  enablePlugin: 'lengthUnits'
};

export const maxHeight = {
  prop: 'max-height',
  propName: 'max-h',
  enablePlugin: 'lengthUnits'
};

// letter-spacing
// ------------------------------------------------------------------
export const letterSpacing = {};

// line-height
// ------------------------------------------------------------------
export const lineHeight = {
  prop: 'line-height',
  propName: 'lh',
  enablePlugin: 'lengthUnits'
};

// list-style
// ------------------------------------------------------------------
export const listStyle = {};

// margin
// ------------------------------------------------------------------
export const margin = {
  prop: 'margin',
  propName: 'm',
  subProps: {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: 'left right',
    y: 'top bottom'
  },
  keywordValues: {
    separator: '-',
    values: { auto: 'auto' }
  },
  enablePlugin: 'lengthUnits'
};

// opacity
// ------------------------------------------------------------------
export const opacity = {};

// outline
// ------------------------------------------------------------------
export const outline = {};

// overflow
// ------------------------------------------------------------------
export const overflow = {
  prop: 'overflow',
  propName: '',
  keywordValues: {
    values: {
      clip: 'hidden'
    }
  }
};

// padding
// ------------------------------------------------------------------
export const padding = {
  prop: 'padding',
  propName: 'p',
  subProps: {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: 'left right',
    y: 'top bottom'
  },
  enablePlugin: 'lengthUnits'
};

// pointer-events
// ------------------------------------------------------------------
export const pointerEvents = {};

// position
// ------------------------------------------------------------------
export const position = {
  prop: 'position',
  propName: '',
  keywordValues: {
    values: {
      absolute: 'absolute',
      relative: 'relative',
      fixed: 'fixed',
      sticky: 'sticky'
    }
  }
};

export const top = {
  prop: 'top',
  propName: 't',
  enablePlugin: 'lengthUnits'
};

export const right = {
  prop: 'right',
  propName: 'r',
  enablePlugin: 'lengthUnits'
};

export const bottom = {
  prop: 'bottom',
  propName: 'b',
  enablePlugin: 'lengthUnits'
};

export const left = {
  prop: 'left',
  propName: 'l',
  enablePlugin: 'lengthUnits'
};

// resize
// ------------------------------------------------------------------
export const resize = {};

// stroke
// ------------------------------------------------------------------
export const stroke = {
  prop: 'stroke',
  propName: 'stroke',
  enablePlugin: 'colors'
};

// text-align
// ------------------------------------------------------------------
export const textAlign = {};

// text-decoration
// ------------------------------------------------------------------
export const textDecoration = {
  prop: 'text-decoration',
  propName: 'text',
  keywordValues: {
    separator: '-',
    values: {
      underline: 'underline',
      'decoration-none': 'none'
    }
  }
};

// text-overflow
// ------------------------------------------------------------------
export const textOverflow = {};

// text-transform
// ------------------------------------------------------------------
export const textTransform = {};

// vertical-align
// ------------------------------------------------------------------
export const verticalAlign = {};

// webkit
// ------------------------------------------------------------------
export const webkit = {};

// white-space
// ------------------------------------------------------------------
export const whiteSpace = {};

// width
// ------------------------------------------------------------------
export const width = {
  prop: 'width',
  propName: 'w',
  enablePlugin: 'lengthUnits'
};

export const minWidth = {
  prop: 'min-width',
  propName: 'min-w',
  enablePlugin: 'lengthUnits'
};

export const maxWidth = {
  prop: 'max-width',
  propName: 'max-w',
  enablePlugin: 'lengthUnits'
};

// word-break
// ------------------------------------------------------------------
export const wordBreak = {};

// z-index
// ------------------------------------------------------------------
export const zIndex = {
  propName: 'z',
  prop: 'z-index',
  enablePlugin: 'integers'
};

export const propsConfig = [
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
];

export default propsConfig;
