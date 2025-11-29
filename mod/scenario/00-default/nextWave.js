function nextWave() {
    let nextWave = env.wave + 1
    let actualWave = nextWave

    if (nextWave >= this.waves.length) {
        if (!this.info.loop) return

        actualWave = ((nextWave - 1) % this.waves.length) + 1
    }

    const defaultWave  = this.waves[0]
    // cycle through the waves
    const upcomingWave = this.waves[1 + ((actualWave - 1) % (this.waves.length - 1))]

    const wave = augment({}, defaultWave, upcomingWave)

    env.wave = nextWave
    lab.overlay.messageBar.typeOut({
        text:  `Wave ${nextWave}`,
        keep:  1,
        delay: 1,
    })
    log(`##### next wave: ${nextWave}(${actualWave}) #####`)
    console.dir(wave)
    return wave
}
