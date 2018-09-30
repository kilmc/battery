import { buildClassNameRegexFn } from '../regexes/';
import { BatteryConfig } from '../types/';

const hasMolecules = (arr: string[], config: BatteryConfig) =>
  arr.filter(x => config.molecules.expand[x]).length > 0 ||
  arr.filter(x => config.molecules.merge[x]).length > 0;

const unboundCleanMolecule = (config: BatteryConfig) => (cx: string) => {
  const { expand, merge } = config.molecules;
  const allMolecules = [...Object.keys(expand), ...Object.keys(merge)];
  const regex = new RegExp(buildClassNameRegexFn(config.plugins)(allMolecules));

  return cx.replace(regex, '$2');
};

const getAtoms = (moleculesArr: string[], config: BatteryConfig) => {
  const cleanMolecule = unboundCleanMolecule(config);
  const { expand = {}, merge = {} } = config.molecules;

  return moleculesArr.reduce((xs, x) => {
    const cx = cleanMolecule(x);
    let gathered: string[] = [];

    if (expand[cx]) {
      gathered = gathered.concat(expand[cx]);
    } else if (merge[cx]) {
      gathered = gathered.concat(merge[cx]);
    } else {
      gathered = gathered.concat(x);
    }

    return xs.concat(gathered);
  }, []);
};

export const expandMolecules = (
  moleculesArr: string[],
  config: BatteryConfig
): string[] => {
  let expandedAtoms = [];

  if (expandedAtoms.length < 1) expandedAtoms = getAtoms(moleculesArr, config);
  if (hasMolecules(expandedAtoms, config))
    expandedAtoms = expandMolecules(expandedAtoms, config);

  return [...new Set(expandedAtoms)];
};

export const mergeMolecules = (
  classNames: string[],
  classObjs: { [key: string]: { [key: string]: string } },
  config: BatteryConfig
): { [key: string]: { [key: string]: string } } => {
  const { merge, expand } = config.molecules;
  const cleanMolecule = unboundCleanMolecule(config);
  return classNames.reduce(
    (xs: { [key: string]: { [key: string]: string } }, x) => {
      const cx = cleanMolecule(x);
      if (merge[cx]) {
        xs[x] = Object.assign({}, ...merge[cx].map(x => classObjs[x]));
      } else if (expand[cx]) {
        xs = {
          ...xs,
          ...mergeMolecules(expand[cx], classObjs, config)
        };
      }

      return xs;
    },
    {}
  );
};
