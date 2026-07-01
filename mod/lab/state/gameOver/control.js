function onActivate() {
    this.startedAt = env.time
    lab.background = env.style.color.sky

    if (env.gameResult === 'blackout') {
        this.__.gameOverLabel.text = 'Total Blackout!'
    } else if (env.gameResult === 'success') {
        this.__.gameOverLabel.text = 'Air Raid is Over!'
    }

    job.monitor.controller.saveTargetMap()
    job.monitor.controller.bindAll(this)
}

function onDeactivate() {
    job.monitor.controller.restoreTargetMap()
}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    job.control.state.transitTo('menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.gameOver.hold) {
        this.next()
    }
}

function cutOff(action) {
    this.next()
}
