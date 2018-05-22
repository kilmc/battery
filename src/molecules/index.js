import { buildClassNameRegexFn } from '../regexes/';

const hasMolecules = (arr,config) =>
  arr.filter(x => config.molecules.expand[x]).length > 0 ||
  arr.filter(x => config.molecules.merge[x]).length > 0;

const unboundCleanMolecule = (config) => (cx) => {
  const { expand, merge } = config.molecules;
  const allMolecules = [...Object.keys(expand), ...Object.keys(merge)];
  const regex = new RegExp(buildClassNameRegexFn(config.plugins)(allMolecules));

  return cx.replace(regex, '$2');
};

const getAtoms = (moleculesArr,config) => {
  const cleanMolecule = unboundCleanMolecule(config);
  const { expand, merge } = config.molecules;

  return moleculesArr.reduce((xs,x) => {
    const cx = cleanMolecule(x);
    let gathered = [];

    if (expand[cx]) {
      gathered = gathered.concat(expand[cx].split(' '));
    } else if (merge[cx]) {
      gathered = gathered.concat(merge[cx].split(' '));
    } else {
      gathered = gathered.concat(x);
    }

    return xs.concat(gathered);
  },[]);
};

export const expandMolecules = (moleculesArr,config) => {
  let expandedAtoms = [];

  if (expandedAtoms.length < 1) expandedAtoms = getAtoms(moleculesArr,config);
  if (hasMolecules(expandedAtoms,config)) expandedAtoms = expandMolecules(expandedAtoms,config);

  return [...new Set(expandedAtoms)];
};

export const mergeMolecules = (classNames,classObjs,config) => {
  const { merge, expand } = config.molecules;
  const cleanMolecule = unboundCleanMolecule(config);
  return classNames.reduce((xs,x) => {
    const cx = cleanMolecule(x);
    if (merge[cx]) {
      xs[x] = Object.assign({},...merge[cx].split(' ').map(x => classObjs[x]));
    } else if (expand[cx]) {
      xs = {
        ...xs,
        ...mergeMolecules(expand[cx].split(' '),classObjs,config)
      };
    }

    return xs;
  },{});
};
