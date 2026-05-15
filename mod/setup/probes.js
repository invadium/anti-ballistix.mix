function probes() {

    if (env.showCoordinates) {

        lab.port.spawn( 'RulerProbe', {
            x:      -600,
            y:       0,
            width:   1200,

            verticalAlignment: 'top',

            transient: true,

            evo: function(dt) {
                this.y = this.__.topEdge() + 100
            },
        })

        lab.port.spawn( 'RulerProbe', {
            x:       0,
            y:      -1000,
            height:  2000,

            horizontalAlignment: 'left',

            transient: true,

            evo: function(dt) {
                this.x = this.__.leftEdge() + 100
            },
        })
        lab.port.spawn( 'RulerProbe', {
            x:       0,
            y:      -1000,
            height:  2000,

            horizontalAlignment: 'right',

            transient: true,

            evo: function(dt) {
                this.x = this.__.rightEdge() - 100
            },
        })

        lab.port.sky.spawn( dna.probe.EdgeProbe, {
            style: {
                color: '#00aabb',
                dash:  [ 30, 35 ],
                lineWidth: 8,

                dx: 200,
                dy: 200,
            },
        })
        lab.port.sky.spawn( dna.probe.CoordinateSystemProbe, {
            style: {
                color: '#00ffff',
            },
        })
        lab.port.sky.spawn( dna.probe.CoordinateMarker, {
            x: 250,
            y: 400,
            style: {
                color: '#00ffff',
            },
        })

        lab.port.ground.spawn( dna.probe.EdgeProbe, {
            style: {
                color: '#ff8050',
                dash:  [ 40, 45 ],
                lineWidth: 4,
            },
        })
        lab.port.ground.spawn( dna.probe.CoordinateSystemProbe, {
            axisRY:     .25,
            style: {
                color: '#ff8050',
            },
        })

        lab.port.battleground. spawn( dna.probe.EdgeProbe, {
            style: {
                color: '#00ff40',
                dash:  [ 25, 30 ],
                lineWidth: 6,
            },
        })
        lab.port.battleground.spawn( dna.probe.CoordinateSystemProbe, {
            axisRY:     .5,
            axisRX:     .5,
            style: {
                color: '#00ff40',
            },
        })
    }

}
probes.Z = 21
