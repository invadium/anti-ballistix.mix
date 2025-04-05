function environment() {
    env.debug = !!env.config.debug

    // define the playable field
    env.playfield = {
        width:  1920,
        height: 1080,
    }

    lib.storage.loadOpt()
}
environment.Z = 1
