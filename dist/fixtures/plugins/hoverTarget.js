export var hoverTargetPlugin = {
    name: 'hoverTarget',
    type: 'selector',
    affixType: 'prefix',
    modifiers: [
        {
            name: 'hoverItem',
            separator: '-',
            identifier: 'hover-item',
            modifierFn: function (selector) { return "hover-target:hover ." + selector; },
        },
    ],
};
