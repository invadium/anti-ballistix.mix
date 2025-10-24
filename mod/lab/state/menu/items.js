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
        options: [
            { title: '1', val: 1 },
            { title: '2', val: 2 },
            { title: '3', val: 3 },
            { title: '4', val: 4 },
            { title: '5', val: 5 },
            { title: '6', val: 6 },
            { title: '7', val: 7 },
        ],
        current: 2,
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

