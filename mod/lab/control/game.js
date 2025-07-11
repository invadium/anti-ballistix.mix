function inProgress() {
    return (env.gameState === 'started')
}

function pause() {
    lab.port.pause()
    lab.overlord.pause()
    lab.control.pause()
}

function resume() {
    lab.port.resume()
    lab.overlord.resume()
    lab.control.resume()
}

function cleanUp() {
    lab.backdrop.city.detachAll()

    const ls = lab.port._ls
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (!e.transient) {
            lab.port.detach(e)
        }
    }
}

function resetEnv() {
    env.score   = 0
    env.balance = 0
}

function scenario(scenarioConfig) {
    if (!scenarioConfig) throw new Error("Can't start the scenario - scenario configuration is missing!")

    env.gameState = 'starting-scenario'
    cleanUp()
    resetEnv()

    if (isFun(scenarioConfig.setup)) scenarioConfig.setup()
    on('newMission') // TODO rename to newScenario?

    env.scenario = scenarioConfig
    env.gameState = 'started'

    // TODO determine the scenario-specific background
    lab.background = null
}
