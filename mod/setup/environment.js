function environment() {
    for(let p in env.config) {
        if (p.startsWith('debug') || p.startsWith('show')) {
            env[p] = env.config[p]
        }
    }

    // define the playable field
    env.playfield = {
        width:  1920,
        height: 1080,
    }

    lib.storage.loadOpt()
}
environment.Z = 1
