function nextWave() {
    env.wave ++
    if (env.wave >= this.waves.length) return

    const defaultWave  = this.waves[0]
    // cycle through the waves
    const upcomingWave = this.waves[1 + env.wave % (this.waves.length - 1)]

    const wave = augment({}, defaultWave, upcomingWave)

    log(`##### next wave: ${env.wave} #####`)
    console.dir(wave)
    return wave
}
