export const HTMLParser = (input: string): string[] => {
  const classes = input
    .match(/class=('|")(.*?)('|")/g)
    .map(x => x.replace('class=', '').replace(/("|')/g, ''))
    .reduce((xs, x) => xs.concat(x.split(' ')), [])
    .filter(x => x !== '');

  return [...new Set(classes)];
};
