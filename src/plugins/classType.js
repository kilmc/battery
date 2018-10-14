import generateLibrary from '../../src/generators/generateLibrary';

export const classTypeToClassObj = (pluginName, classNames, config) => {
  const plugin = config.plugins.filter(plugin => plugin.name === pluginName)[0];

  const rootClassName = plugin.className[0];
  let rootClassNameStyles;
  if (plugin.className.length === 2) {
    rootClassNameStyles = plugin.className[1];
  }
  let modifierRegexes = [];
  if (plugin.modifiers) {
    modifierRegexes = plugin.modifiers.reduce((accum, modifier) => {
      const {
        regex,
        separator = '',
        regexSeparator = '',
        className
      } = modifier;
      let suffix;
      if (regex && className) {
        suffix = `${className[0]}${regexSeparator}${regex}`;
      } else if (regex) {
        suffix = regex;
      } else {
        suffix = className[0];
      }
      accum.push(`${separator}${suffix}`);
      if (rootClassNameStyles) {
        accum.push('$');
      }
      return accum;
    }, []);
  }

  const classTypeRegex = new RegExp(
    `${rootClassName}(${modifierRegexes
      .sort((a, b) => b.length - a.length)
      .join('|')})`
  );

  return classNames.reduce((accum, cx) => {
    if (!cx.match(classTypeRegex)) return accum;
    let pluginModifier;
    if (plugin.modifiers) {
      pluginModifier = plugin.modifiers.filter(modifier => {
        const {
          regex,
          separator = '',
          regexSeparator = '',
          className
        } = modifier;
        let suffix;
        if (regex && className) {
          suffix = `${className[0]}${regexSeparator}${regex}`;
        } else if (regex) {
          suffix = regex;
        } else {
          suffix = className[0];
        }

        return new RegExp(`${rootClassName}${separator}${suffix}`).test(cx);
      })[0];
    }

    if (!pluginModifier) {
      accum[cx] = rootClassNameStyles;
      return accum;
    }
    let modifierClassNameStyles;

    if (!!pluginModifier.className && pluginModifier.className.length === 2) {
      modifierClassNameStyles = pluginModifier.className[1];
    }

    const modifierStyles = modifierClassNameStyles
      ? modifierClassNameStyles
      : pluginModifier.modifierFn(
          cx.match(new RegExp(pluginModifier.regex))[0]
        );
    accum[cx] = modifierStyles;

    return accum;
  }, {});
};

export const generateClassTypeClassNames = plugins => {
  return plugins.reduce((sorted, plugin) => {
    sorted[plugin.name] = plugin.className[0];
    return sorted;
  }, {});
};

export const sortClassTypeClassNames = (classNames, pluginsObj) => {
  return Object.entries(pluginsObj).reduce((accum, plugin) => {
    const [pluginName, className] = plugin;
    const pluginClasses = classNames.filter(cx =>
      new RegExp(className).test(cx)
    );
    accum[pluginName] = pluginClasses;
    return accum;
  }, {});
};

export const processClassType = (classNames, config) => {
  const { plugins } = config;
  const classTypePlugins = plugins.filter(plugin => plugin.type === 'class');
  if (classTypePlugins.length < 1) return {};
  const pluginClassNamesObj = generateClassTypeClassNames(classTypePlugins);
  const classTypeClassObjs = Object.keys(pluginClassNamesObj).reduce(
    (accum, pluginName) => {
      accum = {
        ...classTypeToClassObj(pluginName, classNames, config),
        ...accum
      };
      return accum;
    },
    {}
  );

  Object.entries(classTypeClassObjs).forEach(classObj => {
    const [cx, styles] = classObj;

    if (Array.isArray(styles)) {
      classTypeClassObjs[cx] = Object.values(
        generateLibrary(styles, config)
      ).reduce((xs, x) => {
        xs = {
          ...x,
          ...xs
        };
        return xs;
      }, {});
    }
  });

  return classTypeClassObjs;
};
