function inProgress() {
    return (env.gameState === 'started')
}

function level(levelConfig) {
    env.level = levelConfig
    env.gameState = 'started'

    // TODO determine the level-specific background
    lab.background = env.style.color.sky
}
