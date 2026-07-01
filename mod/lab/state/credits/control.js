function onActivate() {
    this.startedAt = env.time

    this.__.apply(e => kill(e), e => e.roll)
    
    this.__.spawn(dna.hud.RollingText, {
        roll:        true,
        name:       'textRoll',
        ry:         .8,
        text:        res.txt.credits,
        font:        env.style.font.credits.head, 
        textColor:   env.style.color.credits.front,
        shadowColor: env.style.color.credits.back,
        lineSpeed:  -ry(.05),
        lineTime:    1,
        keepLineFor: 10,
    })

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
    if (this.startedAt && env.time > this.startedAt + env.tune.credits.keep) {
        this.next()
    }
}

function cutOff(action) {
    this.next()
}
