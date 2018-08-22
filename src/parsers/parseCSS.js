const parseStyleBlock = (string) => {
  const [className, body] = string
    .replace(/\s/g,'')
    .match(/(.*)\{(.*)\}/)
    .splice(1);

  const parsedBody = body
    .split(';')
    .filter(x => x !== '')
    .reduce((acc,declaration) => {
      const [prop,value] = declaration.split(':');
      acc[prop] = value;

      return acc;
    },{});

  return { [className]: parsedBody };
};

export default parseStyleBlock;
