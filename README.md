# Battery
An Atomic/Functional CSS Toolkit

## Core concept
Well designed, predictable and learnable naming conventions are powerful. If internalize that there is a small set of strings that you can learn which will allow you to build and style anything on the web without ever having to write any actual CSS, that would be pretty sweet.

## Battery Config

The most crucial part of Battery from the perspective of a consumer/user of this tool is the config. This is where you define all your rules so that the machine knows what you want when you ask for styles. The config allows for a huge amount of flexibility. You can hand-code all the values, you can build plugins to speed things up, you can even use your definitions to form groups of classes.

## Singles/Units/Atoms

A Single is a class that defines the value for a single property.
``` CSS
.bg-white { background-color: #FFF }
.relative { position: relative }
.z1 { z-index: 1 }
```

## Sets/Groups/Molecules

Merge or expand depending on your setup

Allow for dynamic and static molecules



# General
Singles isolate specific functionality into a single, reusable class
Sets groups singles together for common patterns

# Specific purpose
Tool, feature, utility, appliance, auxilliary, instrument







Rename className plugins to selector plugins
Process selector plugins after sorting into at rules
(I have not idea how to deal with multiple at-rules)
Style tags feature is going to be crucial for Isomorphic rendering
CSSFuntion should be available to props and plugins as an option
Render based off the cascade (per breakpoint)
 - Utilities/Features Etc.
 - Merged molecules
 - Atoms
