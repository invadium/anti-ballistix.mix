function keyDown(e) {
    if (e.repeat) return

    if (lab.port.paused) {
        lab.control.game.resume()
        return
    }

    switch(e.code) {
        case env.bind.fixed.speedUp:
            if (e.ctrlKey || e.altKey) {
                env._evoSpeed *= env.tune.control.ffwStep
            } else {
                env._evoSpeed = env.tune.control.ffwSpeed
            }
            break
        case env.bind.fixed.slowDown:
            if (e.ctrlKey || e.altKey) {
                env._evoSpeed *= env.tune.control.slowDownStep
            } else {
                env._evoSpeed = env.tune.control.slowDownSpeed
            }
            break
        case env.bind.fixed.speedNormal:
            env._evoSpeed = 1
            break
    }

    if (e.ctrlKey || e.altKey || e.metaKey) return

    switch(e.code) {
        case env.bind.fixed.mainMenu:
            if (!env.transition) {
                lab.control.state.transitTo('menu')
            }
            break

        case env.bind.fixed.pause:
            lab.control.game.pause()
            break
    }

}
