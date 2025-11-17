function onActivate() {
    this.startedAt = env.time
    lab.background = env.style.color.sky

    if (env.gameResult === 'blackout') {
        this.__.gameOverLabel.text = 'Blackout!'
    } else if (env.gameResult === 'success') {
        this.__.gameOverLabel.text = 'Air Raid is Over!'
    }

    lab.monitor.controller.saveTargetMap()
    lab.monitor.controller.bindAll(this)
}

function onDeactivate() {
    lab.monitor.controller.restoreTargetMap()
}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    lab.control.state.transitTo('menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.gameOver.hold) {
        this.next()
    }
}

function cutOff(action) {
    this.next()
}
