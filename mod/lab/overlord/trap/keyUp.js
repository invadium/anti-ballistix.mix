function keyUp(e) {

    switch(e.code) {
        case env.bind.fixed.speedUp:
        case env.bind.fixed.slowDown:
            if (e.ctrlKey || e.altKey) break
            env._evoSpeed = 1
            break
    }

}
