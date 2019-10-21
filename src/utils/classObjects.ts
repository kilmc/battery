import { CSSProps } from 'types/css-props';

export const generateClassObject = (propsArr: CSSProps[], value: string) => {
  return propsArr.reduce(
    (accum, prop) => {
      accum[prop] = value;
      return accum;
    },
    {} as { [k in CSSProps]: string },
  );
};
