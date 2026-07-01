function start() {
    if (env.config.scenario) {
        // warp directly into the game
        const flaks = parseInt(env.config.flaks)
        trap('game/scenario', {
            id:       env.config.scenario,
            flaks:    isNum(flaks)? flaks : 0,
            fadein:   0,
        })
    } else if (env.config.menu) {
        job.control.state.transitTo('menu', {
            fadein: 0,
        })
    } else {
        job.control.state.transitTo('title', {
            fadein: 0,
        })
    }
    /*
    if (!job.control.mixer.isPlaying()) {
        job.control.mixer.play()
    }
    */
}
