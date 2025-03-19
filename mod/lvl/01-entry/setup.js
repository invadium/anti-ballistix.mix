function setup() {
    log('!!! setting up the level !!!')

    lab.port.spawn( dna.city.Flak, {
        team: 1,
        name: 'flak',
        x:    0,
        y:    0,
    })
}
