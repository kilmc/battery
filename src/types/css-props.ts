type BackgroundProps =
  | 'background-color'
  | 'background-size'
  | 'background-position'
  | 'background-repeat'
  | 'backround-image';

type BorderShorthandProps =
  | 'border'
  | 'border-top'
  | 'border-right'
  | 'border-bottom'
  | 'border-left';

type BorderColorProps =
  | 'border-color'
  | 'border-top-color'
  | 'border-right-color'
  | 'border-bottom-color'
  | 'border-left-color';

type BorderStyleProps =
  | 'border-style'
  | 'border-top-style'
  | 'border-right-style'
  | 'border-bottom-style'
  | 'border-left-style';

type BorderWidthProps =
  | 'border-width'
  | 'border-top-width'
  | 'border-right-width'
  | 'border-bottom-width'
  | 'border-left-width';

type MarginProps =
  | 'margin'
  | 'margin-top'
  | 'margin-right'
  | 'margin-bottom'
  | 'margin-left';

type PaddingProps =
  | 'padding'
  | 'padding-top'
  | 'padding-right'
  | 'padding-bottom'
  | 'padding-left';

type PositionProps = 'position' | 'top' | 'right' | 'bottom' | 'left';

type HeightProps = 'height' | 'max-height' | 'min-height';
type WidthProps = 'width' | 'max-width' | 'min-width';

type TextProps = 'text-align' | 'text-decoration' | 'text-transform';

type FlexProps = 'flex' | 'flex-shrink' | 'flex-grow' | 'flex-basis';

export type CSSProps =
  | BackgroundProps
  | BorderShorthandProps
  | BorderColorProps
  | BorderStyleProps
  | BorderWidthProps
  | 'color'
  | 'display'
  | 'fill'
  | FlexProps
  | HeightProps
  | MarginProps
  | PaddingProps
  | PositionProps
  | 'stroke'
  | TextProps
  | WidthProps
  | 'z-index';
