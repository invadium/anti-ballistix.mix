function nextWave() {
    env.wave ++
    console.dir(this)
    if (env.wave > this.waves.length) {
        env.wave = 1
    }
    log(`##### next wave: ${env.wave} #####`)

    return this.waves[env.wave - 1]
}
