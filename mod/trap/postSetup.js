function postSetup() {
    if (env.config.scenario) {
        // fast track
        trap('game/scenario', {
            scenario: env.config.scenario,
            fadein: 0,
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
