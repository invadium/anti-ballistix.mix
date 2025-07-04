function inProgress() {
    return (env.gameState === 'started')
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

function level(levelConfig) {
    if (!levelConfig) throw new Error("Can't start the level - level configuration is missing!")

    env.gameState = 'starting-new-level'
    cleanUp()
    resetEnv()

    if (isFun(levelConfig.setup)) levelConfig.setup()
    on('newMission') // TODO rename to newScenario?

    env.level = levelConfig
    env.gameState = 'started'

    // TODO determine the level-specific background
    lab.background = null
}
