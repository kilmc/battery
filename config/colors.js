const colorsConfig = {
  'black': '#000000',
  'white': '#ffffff',
  'pink': '#ff0099',
  'green-800': '#098530',
  'green-700': '#05AF3C',
  'green-500': '#25CB68',
  'green-400': '#2BDE73',
  'blue-600': '#003BFF',
  'blue-500': '#2B60FF',
  'grey-900': '#282828',
  'grey-600': '#656868',
  'grey-500': '#9B9E9E',
  'grey-300': '#DCDEDD',
  'grey-200': '#E8E8E8',
  'grey-100': '#FBFBFA',
  'red-500': '#EF0707',
  'red-400': '#FF5151',
};

export const themes = {
  default: {
    'primary-light': 'grey-900',
    'primary-dark': 'black',
    'primary-accent': 'green-400'
  },
  build: {
    'primary-light': 'blue-500',
    'primary-dark': 'blue-600',
    'primary-accent': 'blue-500'
  },
  checkout: {
    'primary-light': 'green-500',
    'primary-dark': 'green-700',
    'primary-accent': 'green-500'
  }
};

export default colorsConfig;
