function genPowerStations(st) {
    const src = this.src

    const N    = st.powerStations
    //      step = 100 / (N+1)
    // let   bx   = step

    // create power stations
    let totalPower = 0
    for (let i = 0; i < N; i++) {

        // const freeDot = lab.port.grid.rows[2].locateRandom( d => !d.pin && d.next && !d.next.pin, src )
        // const freeDot = lab.port.grid.locateRandomDot( 1, 6, d => !d.pin && d.next && !d.next.pin, src )
        const freeDot = lab.port.grid.rows[3].splitSearch( d => !d.pin && d.next && !d.next.pin, src )
        if (!freeDot) {
            log.warn(`Failed to locate a free vapor dot for the power station #${i + 1}`)
            return
        } 

        const z = src.rndf()
        const powerStation = lab.port.spawn( dna.city.PowerStation, {
            team:  1,
            // Z:     0,
            // x:     crx(bx),
            // z:     z,
            //ry:    env.tune.powerStationLine + .1 * z,
        })
        powerStation.pinToGrid(freeDot)

        if (env.showCoordinates) {
            powerStation.install(new dna.probe.CoordinatesProbe({
                x: -40,
                y:  40,
            }))
        }
        totalPower += powerStation.getCurrentPower()
        // bx += step
    }

    lab.port.selectInstancesOf( dna.city.PowerStation ).forEach( ps => {
        ps.pushOut( src.rndi(3) )
    })

    env.powerDemand = totalPower
}
