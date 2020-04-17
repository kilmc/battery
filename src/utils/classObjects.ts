import { CSSProperties } from '../types/css';



export const generateClassObject = (
  propsArr: CSSProperties[],
  value: string,
) => {
  return propsArr.reduce(
    (accum, prop) => {
      accum[prop as string | number] = value;
      return accum;
    },
    {} as { [k in CSSProperties]: string },
  );
};
