function setup() {
    log('!!! setting up the level !!!')

    // TODO generalize into a common level generator
    this.src = math.createRandomGenerator()
    this.src.setSeed(868)

    this.city()

    const N    = 5,
          step = 100 / (N+1)
    let   bx   = step

    for (let i = 0; i < N; i++) {
        lab.port.spawn( dna.city.PowerStation, {
            Z:    11,
            team: 1,
            x:    crx(bx),
            ry:   env.tune.powerStationLine,
        })
        bx += step
    }

    lab.port.spawn( dna.city.Flak, {
        Z:    101,
        team: 1,
        x:    crx(25),
        y:    cry(10),
    })

    lab.port.spawn( dna.city.Flak, {
        Z:    101,
        team: 1,
        x:    crx(50),
        y:    cry(10),
    })

    lab.port.spawn( dna.city.Flak, {
        Z:    101,
        team: 1,
        x:    crx(75),
        y:    cry(10),
    })
}
