function inProgress() {
    return (env.gameState === 'started')
}

function level(levelConfig) {
    if (!levelConfig) throw new Error("Can't start the level - level configuration is missing!")

    if (isFun(levelConfig.setup)) levelConfig.setup()

    env.level = levelConfig
    env.gameState = 'started'

    // TODO determine the level-specific background
    lab.background = null
}
