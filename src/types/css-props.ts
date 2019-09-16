type BackgroundProps =
  | 'background-color'
  | 'background-size'
  | 'background-position'
  | 'background-repeat'
  | 'backround-image';

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

type CSSProps =
  | BackgroundProps
  | 'color'
  | 'display'
  | 'fill'
  | HeightProps
  | MarginProps
  | PaddingProps
  | PositionProps
  | 'stroke'
  | TextProps
  | WidthProps
  | 'z-index';
