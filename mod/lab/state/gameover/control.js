function onActivate() {
    this.startedAt = env.time
}

function onDeactivate() {}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    lab.control.state.transitTo('menu')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.gameover.hold) {
        this.next()
    }
}
