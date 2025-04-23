function setup() {
    log('!!! setting up the level !!!')

    this.src = math.createRandomGenerator()
    this.src.setSeed = 2145

    this.city()

    lab.port.spawn( dna.city.Flak, {
        team: 1,
        name: 'flak1',
        x:    crx(25),
        y:    cry(10),
    })

    lab.port.spawn( dna.city.Flak, {
        team: 1,
        name: 'flak2',
        x:    crx(50),
        y:    cry(10),
    })

    lab.port.spawn( dna.city.Flak, {
        team: 1,
        name: 'flak3',
        x:    crx(75),
        y:    cry(10),
    })
}
