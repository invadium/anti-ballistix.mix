module.exports = {

    onShow: function() {
        //log('showing menu')
    },

    onSelect: function(item, i) {
        // catch all selecting events
        log('selected: ' + this.__.itemTitle(item))
    },

    onSwitch: function(item, i) {
        log('switching to: ' + this.__.itemTitle(item))
    },

    onIdle: function() {
        if (this.__.items.state !== 'main') return
        if (lab.control.mission.inProgress()) return

        // this.__.control.newGame()

        const idleScenario = $.scenario._menuList[0]
        idleScenario.flaks = RND(env.tune.flaks.min, env.tune.flaks.max)

        signal('game/scenario', idleScenario)
    },

    onHide: function() {
        // log('hiding menu')
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
        this.__.mousePush()
    },

    mouseUp(e) {
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

                switch(this.__.items.state) {
                    case 'main':
                        this.__.control.resumeGame()
                        break
                    case 'options':
                        this.__.returnBack(true)
                        break
                }
                break
        }
    },
}
