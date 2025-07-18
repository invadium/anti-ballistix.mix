module.exports = {

    onShow: function() {
        log('showing menu')
    },

    onSelect: function(item, i) {
        // catch all selecting events
        log('selected: ' + this.__.itemTitle(item))
    },

    onSwitch: function(item, i) {
        log('switching to: ' + this.__.itemTitle(item))
    },

    onIdle: function() {
        if (lab.control.mission.inProgress()) return

        // TODO start the game in demo mode
        signal('game/scenario', {
            scenario: 1,
        })
    },

    onHide: function() {
        log('hiding menu')
    }, 

    select: function(item, i) {
        // handle select event
        log('handling: ' + this.__.itemTitle(item))
    },

    resize() {
        this.__.adjust()
    },

    mouseDown(e) {
        this.__.touchIt()
        this.__.mouseSelect()
    },

    mouseMove(e) {
        this.__.touchIt()
    },

    keyDown(e) {
        if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return

        switch(e.code) {
            case env.bind.fixed.mainMenu:

                log('menu.state: ' + this.__.items.state)
                switch(this.__.items.state) {
                    case 'main':
                        lab.control.state.transitTo('city')
                        break
                    case 'options':
                        this.__.returnBack(true)
                        break
                }
                break
        }
    },
}
