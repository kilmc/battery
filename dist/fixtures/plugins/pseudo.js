export var pseudoPlugin = {
    name: 'pseudo',
    type: 'selector',
    affixType: 'prefix',
    modifiers: [
        {
            name: 'hover',
            separator: '-',
            identifier: 'hover',
            modifierFn: function (selector) { return selector + ":hover"; },
        },
        {
            name: 'focus',
            separator: '-',
            identifier: 'focus',
            modifierFn: function (selector) { return selector + ":focus"; },
        },
    ],
};
