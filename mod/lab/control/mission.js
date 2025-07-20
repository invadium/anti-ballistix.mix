function inProgress() {
    return (env.gameState === 'started')
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
    env.score   = 0
    env.balance = 0
}

function newScenario(scenarioConfig) {
    if (!scenarioConfig) throw new Error("Can't start the scenario - scenario configuration is missing!")

    env.gameState = 'starting-scenario'
    cleanUp()
    resetEnv()

    if (isFun(scenarioConfig.setup)) scenarioConfig.setup()
    on('newScenario')

    env.scenario = scenarioConfig
    env.gameState = 'started'

    // TODO determine the scenario-specific background
    lab.background = null
}
