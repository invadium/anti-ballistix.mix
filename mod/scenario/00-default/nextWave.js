function nextWave() {
    let nextWave = env.wave + 1
    let actualWave = nextWave
    let loop = 0

    if (nextWave >= this.waves.length) {
        if (!this.info.loop) return

        actualWave = ((nextWave - 1) % (this.waves.length - 1)) + 1
        loop = floor((nextWave - 1) / (this.waves.length - 1))
    }

    const defaultWave  = this.waves[0]
    // cycle through the waves
    const upcomingWave = this.waves[1 + ((actualWave - 1) % (this.waves.length - 1))]

    const wave = augment({}, defaultWave, upcomingWave, {
        loop: loop,
    })
    if (isFun(this.tune)) this.tune(wave)

    env.wave = nextWave
    env.iwave = env.wave - 1
    log(`##### next wave: ${nextWave}(W${actualWave}/L${loop}) #####`)
    console.dir(wave)
    return wave
}
