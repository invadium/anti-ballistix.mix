function start() {
    if (env.config.scenario) {
        // warp directly into the game
        trap('game/scenario', {
            id:       env.config.scenario,
            fadein:   0,
        })
    } else {
        lab.control.state.transitTo('title', {
            fadein: 0,
        })
    }
    /*
    if (!lab.control.mixer.isPlaying()) {
        lab.control.mixer.play()
    }
    */
}
