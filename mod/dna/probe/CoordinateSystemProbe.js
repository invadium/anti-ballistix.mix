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
        const { __, r, dx, dy, style } = this
        const cartesian = __.cartesian

        save()
        const ux = __.ux(0),
              uy = __.uy(0)
        translate(ux, uy)
        if (cartesian) scale(1, -1)

        const al = .35 * r,
              aw = .50 * al,
              RW = (this.axisRX || .25) * __.width(),
              RH = (this.axisRY || .25) * __.height()
        stroke(style.color)
        lineWidth(style.lineWidth)
        graph.arrowLine(-r,  0, RW, 0,  al, aw)
        graph.arrowLine( 0, -r, 0,  RH, al, aw)

        baseTop()
        alignLeft()
        font(env.style.font.debug.head)
        fill(style.color)

        function ltext(msg, tx, ty) {
            save()
            if (cartesian) scale(1, -1)
            text(msg, tx, ty)
            restore()
        }
        
        ltext('0x0 ' + this.__.name + '-space', 5, 5)

        // TODO MUST be separate cross-marker probes!!! Move them out!
        function cross(cx, cy, u) {
            save()
            translate(cx, cy)
                stroke(style.color)
                line(-u,  0, u, 0)
                line( 0, -u, 0, u)

                fill(style.color)
                ltext(`${cx}x${cy}`, 5, 5)
            restore()
        }
        const u = .5 * r
        cross(dx, dy, u)
        cross(-dx, -dy, u)

        restore()
    }

}
