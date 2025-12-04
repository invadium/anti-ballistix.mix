// TODO should it be a part or overlord/waver???

function inProgress() {
    return (env.gameState === 'started')
}

function hasStarted() {
    return (env.gameState === 'started' || env.gameState === 'gameOver')
}

function pause() {
    lab.port.pause()
    lab.overlord.pause()
    lab.control.pause()
    env.pauseTimestamp = env.realTime
}

function resume() {
    lab.port.resume()
    lab.overlord.resume()
    lab.control.resume()
}

function cleanUp() {
    lab.monitor.controller.releaseAll()
    lab.backdrop.city.detachAll()

    const ls = lab.port._ls
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (!e.transient) {
            kill(e)
            //lab.port.detach(e)
        }
    }
}

function resetEnv() {
    env.wave    = 0
    env.score   = 0
    env.bounty  = 0

    env.stat.reset()
    console.dir(env.stat)
}

function newScenario(scenario) {
    if (!scenario) throw new Error(`Missing scenario profile!`)

    env.gameState = 'starting-scenario'
    env.gameResult = 'undecided'
    log(`Starting [${scenario.info.title}]...`)

    cleanUp()
    resetEnv()

    env.scenario = scenario

    if (isFun(scenario.setup)) scenario.setup()
    // TODO determine the scenario-specific background
    lab.background = null
    lab.overlay.messageBar.typeOut({
        text:  scenario.info.title,
        delay: 2,
    })

    on('newScenario')

    env.gameState = 'started'
}

function gameOver() {
    env.gameState = 'gameOver'
    lab.control.state.transitTo('gameOver', {
        fadein: 5,
    })
}
