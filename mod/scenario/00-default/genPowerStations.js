function genPowerStations(st) {
    const src = this.src

    const N    = st.powerStations
    //      step = 100 / (N+1)
    // let   bx   = step

    // create power stations
    let totalPower = 0
    for (let i = 0; i < N; i++) {

        const freeDot = lab.port.grid.rows[4].splitSearch( d => !d.pin ) 
        if (!freeDot) {
            log.warn(`Failed to locate a free vapor dot for the power station #${i + 1}`)
            return
        } 

        const z = src.rndf()
        const powerStation = lab.port.spawn( dna.city.PowerStation, {
            team:  1,
            dot:   freeDot,
            // Z:     0,
            // x:     crx(bx),
            // z:     z,
            //ry:    env.tune.powerStationLine + .1 * z,
        })
        freeDot.attach(powerStation)

        if (env.showCoordinates) {
            powerStation.install(new dna.probe.CoordinatesProbe({
                x: -40,
                y:  40,
            }))
        }
        totalPower += powerStation.getCurrentPower()
        // bx += step
    }
    env.powerDemand = totalPower
}
