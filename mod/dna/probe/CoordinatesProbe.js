class CoordinatesProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'coordinatesProbe',
            x:     0,
            y:     0,
            r:     50,
            dir:   0,
        }, st)
    }

    draw() {
        const __ = this.__,
              r  = this.r,
              hr = 0.5 * r  // half size

        // assume we are at the body's origin
        save()
        // rotate back to normalize the attitude towards the viewport
        rotate(-this.__.dir + this.dir)

        // the origin crosshair
        const al = .35 * hr,
              aw = .50 * al
        lineWidth(2)
        stroke('#ff8040')
        graph.arrowLine( 0, -hr, 0, hr, al, aw )

        stroke('#ff8040')
        graph.arrowLine( -hr, 0, hr, 0, al, aw )

        translate(this.x, this.y)

        // hint x/y axes and direction
        stroke('#ff4040')
        lineWidth(2)
        line( 0, r, 0, -r )
        line(-r, 0, r,   0)
        // direction
        stroke('#ffff40')
        graph.arrowLine(0, 0, cos(__.dir) * hr, sin(__.dir) * hr, al, aw)

        fill('#ffff00')
        baseTop()
        alignRight()
        font(env.style.font.debug.head)
        text(`${round(this.__.x)}x${round(this.__.y)} | Z${round(this.__.Z)}`, -5, 10)

        restore()
    }

}
