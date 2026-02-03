function probes() {

    if (env.showCoordinates) {
        lab.port.sky.spawn( dna.probe.EdgeProbe, {
            style: {
                color: '#00ffff',
            },
        })
        lab.port.sky.spawn( dna.probe.CoordinateSystemProbe, {
            style: {
                color: '#00ffff',
            },
        })

        lab.port.ground.spawn( dna.probe.EdgeProbe, {
            style: {
                color: '#902050',
            },
        })
        lab.port.ground.spawn( dna.probe.CoordinateSystemProbe, {
            style: {
                color: '#902050',
            },
        })
    }

}
probes.Z = 21
