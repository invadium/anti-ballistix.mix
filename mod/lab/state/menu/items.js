const items = [
    {
        title: 'New Game',
        select: function(menu) {
            // pick the selected scenario
            const scenarioOptions = menu.getItemById('scenarios')
            const idx = scenarioOptions.current || 0
            const selectedScenario = scenarioOptions.options[idx]
            signal('game/scenario', selectedScenario)
        },
    },
    {
        title: 'Scenario',
        section: true,
    },
    {
        id:      'scenarios',
        options:  [],
    },
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
items.state = 'main'
items.preservePos = true

