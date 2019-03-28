# battery

An Atomic CSS Generator

(Documentation is in progress)

## Makeup of an Atomic Class

[prefix][propname][value][valuemodifier][suffix]

## Prop Configs

These are one of the two core aspects of Battery's configuration. Your `propConfig`'s will house the vast majority of your naming convention.

### Examples

The following are some examples of `propConfig`'s and what Battery will output given class names that match those configs.

**Note:** Some of these examples include references to Plugins which are the other core aspect of Battery. Feel free to read through this section and gloss over the plugins part as we will be covering them in detail later (or if you can't way, jump ahead and checkout how Plugins work)

#### text-align

```
{
  prop: 'text-align',
  propName: 'text',
  keywordValues: {
    separator: '-',
    values: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  }
}

// Input
['text-left','text-center','text-right']

// Output
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
```

#### position

```
{
  prop: 'position',
  propName: '',
  keywordValues: {
    values: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky'
    }
  }
}

// Input
['static', 'relative', 'absolute', 'fixed', 'sticky']

// Output
.static { position: static; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }
```

#### z-index

```
{
  propName: 'z',
  prop: 'z-index',
  enablePlugin: 'integers'
}

// Input
['z1', 'z20', 'z-10', 'z-999']

// Output
.z1 { z-index: 1; }
.z20 { z-index: 20; }
.z-10 { z-index: -10; }
.z-999 { z-index: -999; }
```

#### background-color

```
{
  prop: 'background-color',
  propName: 'bg',
  separator: '-',
  keywordValues: {
    separator: '-',
    values: {
      transparent: 'transparent'
    }
  },
  enablePlugin: 'colors'
}

// Input
['bg-red', 'bg-green', 'bg-blue', 'bg-transparent']

// Output
.bg-red { background-color: #FF0000; }
.bg-green { background-color: #00FF00; }
.bg-blue { background-color: #0000FF; }
.bg-transparent { background-color: transparent; }

```

### Configuration Options

#### `prop` : _string_ **(required)**

This sets which CSS property being configured by the object. This will be the `property` part of the CSS declaration in the final atomic class.

**Example**

```javscript
{
  prop: 'background-color',
  ...
}
```

.bg-black { **background-color**: #000; }

#### `propName` : _string_

This sets the identifier in the classname to tell Battery which property the class is targeting.

```JSON
{
  propName: 'bg',
  ...
}
```

.**bg**-black

#### `propSeparator` : _string_

This sets the separator between the `propName` and the `value` identifiers in the class.

```JSON
{
  propSeparator: '-',
  ...
}
```

.bg**-**black

#### `keywordValues` : _object_

This object allows you to manually set up values for your `property`. This can be used for `keyword` values as determined by the CSS spec, or it can be used when you can't easily create a plugin to handle generating these values.

**Example**

```JSON
{
	prop: 'align-items',
	propName: 'items',
	keywordValues: {
		separator: '-',
		values: {
		'start': 'flex-start',
		'center': 'center',
		'end': 'flex-end'
	}
}
```

.items-start { align-items: flex-start }
.items-center { align-items: center }
.items-end { align-items: flex-end }

##### `values` : _object_

The keys in this object set the indicator on the class and the value sets the `value` for the CSS declaration to be paired with the `property` set by the `prop` on the root `propConfig`

##### `separator` : _string_

This sets the separator between the `propName` and the `value` identifiers in the class. Note: You can optionally rely on the `propSeparator` if you want all of your `values` to be separated using the same separator.

#### `enablePlugin` : _string_

This allows your classnames to take a predefined set of values based on a plugin in your config. The string in this section must match the configured `name` of a plugin in your Battery Config.

#### `pluginDefault` : _boolean_

A `propConfig` can to be set as the `pluginDefault`. This allows Battery to determine which `property` to set when it can't find a `propName`. As the example below shows, this can be useful in the case of something like `text-color` if you prefer not to have an indicator like `text` to denote what the color is being applied to.

```
{
  prop: 'color',
  propName: '',
  keywordValues: {
    values: { transparent: 'transparent' }
  },
  pluginDefault: true,
  enablePlugin: 'colors'
}

// Input
['red', 'green', 'blue', 'transparent']

// Output
.red { color: #FF0000; }
.green { color: #00FF00; }
.blue { color: #0000FF; }
.transparent { color: transparent; }

```

#### `allowedValues` | `disallowedValues :`string[]`

These two options let you put constraints on a `propConfig` to disallow some or most values from generating classes.

An example of where this can be useful is with a color plugin. This plugin could contain a lot of different colors, but not all of them should be used for all properties that accept a color value. If there are colors that you have determined should not be used for text due to legibility issues, you can add an array of `disallowedValues` to your `propConfig` so that Battery will filter those out before it generates the final list of classes

The `allowedValues` option could be leveraged in the case where you only want to allow a small number of values from a plugin. A good example of this is plugin that outputs hard pixel values. These values are often used to _magically_ position or size something. Using the following, you could limit the possible values to just a tiny subset for a property: `allowedValues: [1px, 2px, 3px]`

### Documentation Config Options

Battery is intented to be used for more than generation. Your configs can also contain documentation. The following are all options that are used in the Battery Docs App.

#### `propGroup` : _string_

This groups certain properties under one heading so they can be found together in the Docs UI.

## Plugin Configs

Plugins allow you to interpret various kinds of patterns in your classnames and output the desired CSS from matching with those patterns.

### Value Plugins

Value plugins are used to convert parts of a classname into the value of a CSS declaration.

### Type: `pattern`

This type of value plugin is designed to take a regex and will search the value section of the classname for a match. The matching value can the be outputted directly or processed before being set as the value in the atomic class.

**Examples**

```javascript
const integersPlugin = {
  name: 'integers',
  type: 'pattern',
  valueRegexString: '-?[0-9]{1,4}'
};

const flexShrink = {
  prop: 'flex-shrink',
  propName: 'shrink',
  enablePlugin: 'integers'
};

const input = ['shrink2', 'shrink-1'];

const output = `
.shrink2 { flex-shrink: 2; }
.shrink-1 { flex-shrink: -1; }
`;
```

```javascript
const lengthUnitsPlugin = {
  name: 'lengthUnits',
  type: 'pattern',
  valueRegexString: '-?[0-9]{1,4}',
  valueModifiers: [
    {
      name: 'percent',
      indicator: 'p',
      modifierFn: (value) => `${value}%`,
      sampleValues: ['20', '50', '100', '-10', '66']
    },
    {
      name: 'pixel',
      indicator: 'px',
      modifierFn: modifierFn: (value) => `${value/16}rem`,
      sampleValues: ['1', '2', '3', '-2', '-5']
    }
  ]
}

const width = {
  prop: 'width',
  propName: 'w',
  enablePlugin: 'lengthUnits'
}

const positionTop = {
  prop: 'top',
  propName: 't',
  enablePlugin: 'lengthUnits'
}

const fontSize = {
  prop: 'font-size',
  propName: 'f-size',
  propSeparator: '-'
  enablePlugin: 'lengthUnits'
}

const input = ['t10px','w50p','f-size-16px','t-25p']

const output = `
.t10px { top: 0.625rem }
.w50p { width: 50% }
.f-size-16px { font-size: 1rem}
.t-25p' { top: -25% }
`
```

### Configuration Options

**Note:** There are certain configuration options that are only available or necessary for specific plugin `type`'s

#### `name` : _string_

This sets a unique name so that you can enable a specific plugin inside of a `propConfig`

#### `type` : _string_

This give Battery an indication of how and when it needs to process a given part of a classname. The following are the accepted strings for plugin types.

- `pattern`
- `lookup`
- `classname`
- `atrule`
- `class`

#### `valueRegexString` : _string_

This is a regex in the form of a string which is used to find valid matches in a classname's value portion. This matched value can be passed to a value modifier to process the value before it finally gets set as part of the declaration

#### `valueModifiers` : _object[]_

The value modifier array can contain a set of what are essentially sub plugins. These are used to transform a value based on a modifier on the end of that value.

### Selector Plugins

These plugins allow you to modify the selector of a given atomic class. This can be used for everything from adding psuedo selectors like `:focus` and `:hover`, to creating a hover target pattern or something more complex.

### Atrule Plugins

### Class Plugins
