const items = [
    {
        title: 'New Game',
        select: function(menu) {
            menu.control.newGame()
        },
    },
    {
        title: 'Scenario:',
        section: true,
    },
    {
        id:      'scenarios',
        options:  [],
    },
    {
        id:    'flaks',
        title: 'Flaks',
        options: [],
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

