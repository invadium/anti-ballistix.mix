function genFlak(flaks) {
    if (!isNum(flaks) || flaks < env.tune.flaks.min || flaks > env.tune.flaks.max) flaks = env.tune.flaks.default

    // const step = 100 / (flaks+1)
    // let   bx   = step

    for (let i = 0; i < flaks; i++) {

        const freeDot = lab.port.grid.rows[1].splitSearch( d => !d.pin )
        if (!freeDot) {
            log.warn(`Failed to locate a free vapor dot for the flak #${i + 1}`)
            return
        } 

        const flak = lab.port.spawn( dna.city.Flak, {
            team: 1,
            // Z:    101,
            // x:    0,
            // y:    0,
            // BGY:  10,
            
            pods:  [
                new dna.city.pod.Bot(),
                new dna.city.pod.FireControlRadar(),
            ],
        })
        flak.pinToGrid(freeDot)
        flak.activatePod(flak.bot)

        if (env.showCoordinates) {
            flak.install(new dna.probe.CoordinatesProbe({
                x:   -40,
                y:    40,
                dir: -HALF_PI,
            }))
        }

        // bx += step
    }
}
