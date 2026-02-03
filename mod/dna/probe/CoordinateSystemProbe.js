let id = 0

class CoordinateSystemProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'coordinateSystemProbe' + (++id),
        }, st)
    }

    draw() {
        const R = 100
        lineWidth(5)
        stroke('#00ffff')
        line(-R,  0, R, 0)
        line( 0, -R, R, 0)

        line(-100, -100, 100, -100)
    }

}
