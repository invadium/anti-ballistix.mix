const items = [
    {
        title: 'New Game',
        select: function(menu) {
            signal('game/scenario', {
                scenario: 1,
            })
            /*
            // pick the selected scenario
            const scenarioOptions = menu.items[2]
            const idx = scenarioOptions.current || 0
            trap('game/scenario', {
                scenario: idx + 1,
            })
            */
        },
    },
    /*
    {
        title: 'Scenario',
        section: true,
    },
    {
        id:      'scenarios',
        options:  [],
    },
    */
    {
        title: 'Options',
        submenu: 'options',
    },
    {
        title: 'Credits',
        select: function() {
            lab.control.state.transitTo('credits')
        }
    },
    {
        id:     'resume',
        hidden:  true,
        title:  'Resume Game',
        select: function() {
            lab.control.state.transitTo('city')
        },
    },
]
items.preservePos = true

