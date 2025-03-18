function postSetup() {
    if (env.config.level) {
        // fast track
        trap('game/level', {
            level: env.config.level,
            fadein: 0,
        })
    } else {
        lab.control.state.transitTo('title', {
            fadein: 0,
        })
    }
}
