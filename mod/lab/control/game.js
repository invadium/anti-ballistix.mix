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

function level(levelConfig) {
    if (!levelConfig) throw new Error("Can't start the level - level configuration is missing!")

    cleanUp()
    if (isFun(levelConfig.setup)) levelConfig.setup()
    on('newMission')

    env.level = levelConfig
    env.gameState = 'started'

    // TODO determine the level-specific background
    lab.background = null
}
