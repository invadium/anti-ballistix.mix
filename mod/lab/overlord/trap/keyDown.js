function keyDown(e) {
    if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return

    if (lab.port.paused) {
        lab.control.game.resume()
        return
    }

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
