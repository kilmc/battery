import breakpointsConfig from './breakpoints'
import colorsConfig from './colors';
import cssConfig from './css';
import propsConfig from './props';
import unitsConfig from './units';

const config = {
  breakpoints: breakpointsConfig,
  css: cssConfig,
  colors: colorsConfig,
  units: unitsConfig,
  props: propsConfig,
  misc: {
    baseFontSize: 10,
    baselineUnit: 6,
    useRems: true,
  }
};

export default config;
