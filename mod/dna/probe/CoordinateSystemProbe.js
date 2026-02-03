let id = 0

class CoordinateSystemProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'coordinateSystemProbe' + (++id),

            r:     50,

            style: {
                color:     '#ffffff',
                lineWidth:  5,
            },
        }, st)
    }

    draw() {
        const r = this.r

        save()
        const ux = this.__.ux(0),
              uy = this.__.uy(0)
        translate(ux, uy)

        stroke(this.style.color)
        lineWidth(this.style.lineWidth)
        line(-r,  0, r, 0)
        line( 0, -r, 0, r)

        restore()
    }

}
