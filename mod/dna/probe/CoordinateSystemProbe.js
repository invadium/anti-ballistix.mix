let id = 0

class CoordinateSystemProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'coordinateSystemProbe' + (++id),

            r:     50,
            dx:    100,
            dy:    100,

            style: {
                color:     '#ffffff',
                lineWidth:  5,
            },

            hidden: false,
        }, st)
    }

    draw() {
        const { r, dx, dy } = this

        save()
        const ux = this.__.ux(0),
              uy = this.__.uy(0)
        translate(ux, uy)

        stroke(this.style.color)
        lineWidth(this.style.lineWidth)
        line(-r,  0, r, 0)
        line( 0, -r, 0, r)

        baseTop()
        alignLeft()
        font(env.style.font.debug.head)
        fill(this.style.color)
        text('0x0 ' + this.__.name + '-space', 5, 5)

        translate(dx, dy)
        stroke(this.style.color)
        const u = .5 * r
        line(-u,  0, u, 0)
        line( 0, -u, 0, u)

        fill(this.style.color)
        text(`${dx}x${dy}`, 5, 5)

        restore()
    }

}
