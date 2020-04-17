import { CSSProperties } from '../types/css';

export const generateClassObject = (
  propsArr: CSSProperties[],
  value: string,
) => {
  return propsArr.reduce(
    (accum, prop) => {
      accum[prop] = value;
      return accum;
    },
    {} as { [k in CSSProperties]: string },
  );
};
