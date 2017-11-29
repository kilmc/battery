const propsConfig = {
  'basis': 'flex-basis',
  'mt': 'margin-top'
};

export const generate = (classNames) => {
  const processInput = (xs) => xs.split(' ');

  const makeLibrary = (arrAtoms) => arrAtoms.reduce((xs, x) => {
    xs[x] = { [propsConfig[x]]: '' }
    return xs
  },{});

  return JSON.stringify(makeLibrary(processInput(classNames)));
}