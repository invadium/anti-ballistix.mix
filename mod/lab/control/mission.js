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
    env.balance = 0
}

function newScenario(scenarioDef) {
    if (!scenarioDef) throw new Error(`Missing scenario definition!`)

    env.gameState = 'starting-scenario'
    env.gameResult = 'undecided'
    log(`starting scenario [${scenarioDef.info.title}]`)

    cleanUp()
    resetEnv()

    // form the scenario object
    const scenario = augment({}, $.sce['00-default']._dir, scenarioDef._dir)
    console.dir(scenario)

    env.scenario = scenario

    if (isFun(scenario.setup)) scenario.setup()
    on('newScenario')

    // TODO determine the scenario-specific background
    lab.background = null

    env.gameState = 'started'
}

function gameOver() {
    env.gameState = 'gameOver'
    lab.control.state.transitTo('gameOver', {
        fadein: 5,
    })
}
