export const valuesConfig = {
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

const propsConfig = [
  {
    propName: "",
    prop: ["color"],
    allowedValues: ["red-500", "grey-900", "green-800"],
    allowedPseudoValues: {
      hover: [],
      active: []
    }
  },
  {
    propName: "bg",
    prop: ["background-color"],
    allowedValues: ["red-500", "grey-900", "green-800"],
    allowedPseudoValues: {
      hover: [],
      active: []
    }
  },
  {
    propName: "border",
    prop: ["border-color"]
  },
  {
    propName: "fill",
    prop: ["fill"]
  },
  {
    propName: "stroke",
    prop: ["stroke"]
  }
];

export default colorPropsConfig;


const propsConfig = {
  lengthUnits: {
    bg: "background-size",
    border: "border-width",
    m: "margin",
    mt: "margin-top",
    mr: "margin-right",
    mb: "margin-bottom",
    ml: "margin-left",
    mx: "margin-left margin-right",
    my: "margin-top margin-bottom",
    p: "padding",
    pt: "padding-top",
    pr: "padding-right",
    pb: "padding-bottom",
    pl: "padding-left",
    h: "height",
    "min-h": "min-height",
    "max-h": "max-height",
    w: "width",
    "min-w": "min-width",
    "max-w": "max-width"
  },
  integers: {
    grow: "flex-grow",
    order: "order",
    shrink: "flex-shrink",
    z: "z-index"
  }
};


