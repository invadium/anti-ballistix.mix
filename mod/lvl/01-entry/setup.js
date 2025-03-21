function setup() {
    log('!!! setting up the level !!!')

    lab.port.spawn( dna.city.Flak, {
        team: 1,
        name: 'flak',
        x:    crx(25),
        y:    cry(10),
    })
}
