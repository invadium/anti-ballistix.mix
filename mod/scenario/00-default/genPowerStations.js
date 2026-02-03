function genPowerStations(st) {
    const src = this.src

    const N    = st.powerStations,
          step = 100 / (N+1)
    let   bx   = step

    // create power stations
    let totalPower = 0
    for (let i = 0; i < N; i++) {
        const z = src.rndf()
        const powerStation = lab.port.spawn( dna.city.PowerStation, {
            Z:     11,
            team:  1,
            x:     crx(bx),
            z:     z,
            //ry:    env.tune.powerStationLine + .1 * z,
        })

        if (env.showCoordinates) {
            powerStation.install(new dna.probe.CoordinatesProbe({
                x: -40,
                y:  40,
            }))
        }
        totalPower += powerStation.getCurrentPower()
        bx += step
    }
    env.powerDemand = totalPower
}
