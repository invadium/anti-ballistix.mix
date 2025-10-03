function onActivate() {
    this.startedAt = env.time
    lab.background = env.style.color.sky

    if (env.gameResult === 'blackout') {
        this.__.gameOverLabel.text = 'Blackout!'
    } else if (env.gameResult === 'success') {
        this.__.gameOverLabel.text = 'Air Raid is Over!'
    }
}

function onDeactivate() {}

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
