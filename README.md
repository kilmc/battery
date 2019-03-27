# battery

An Atomic CSS Generator

(Documentation is in progress)

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

```
{
  prop: 'background-color',
  ...
}
```

.bg-black { **background-color**: #000; }

#### `propName` : _string_

This sets the identifier in the classname to tell Battery which property the class is targeting.

```
{
  propName: 'bg',
  ...
}
```

.**bg**-black

#### `propSeparator` : _string_

This sets the separator between the `propName` and the `value` identifiers in the class.

```
{
  propSeparator: '-',
  ...
}
```

.bg**-**black

#### `keywordValues` : _object_

This object allows you to manually set up values for your `property`. This can be used for `keyword` values as determined by the CSS spec, or it can be used when you can't easily create a plugin to handle generating these values.

**Example**

```
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
