let id = 0

class CoordinateMarker {

    constructor(st) {
        augment(this, {
            name: 'marker' + (++id),
            r:     50,
        }, st)
    }

    draw() {
        const { __, x, y, r, style } = this
        const cartesian = __.cartesian

        save()
        const ux = __.ux(x),
              uy = __.uy(y)
        translate(ux, uy)
        if (cartesian) scale(1, -1)

        function ltext(msg, tx, ty) {
            save()
            if (cartesian) scale(1, -1)
                baseTop()
                alignLeft()
                font(env.style.font.debug.head)
                fill(style.color)
                text(msg, tx, ty)
            restore()
        }
        
        const u = .5 * r
        stroke(style.color)
        line(-u,  0, u, 0)
        line( 0, -u, 0, u)
        ltext(`${x}x${y}`, 5, 5)

        restore()
    }

}
