function environment() {
    env.debug = !!env.config.debug

    env.playfield = {
        width:  1920,
        height: 1080,
    }
    if (env.debug) {
        //lab.port.spawn(dna.city.probe.PlayfieldProbe)
    }

}
environment.Z = 1
