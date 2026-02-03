class CoordinatesProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'coordinatesProbe',
            x:     0,
            y:     0,
            r:     20,
            dir:   0,
        }, st)
    }

    draw() {
        const r  = this.r,
              hr = 0.5 * r

        // assume we are at the body's origin
        save()
        // rotate back to normalize the attitude towards the viewport
        rotate(-this.__.dir + this.dir)

        // the origin crosshair
        stroke('#ff0000')
        lineWidth(1)
        line(0,  -hr, 0,   hr)
        line(-hr, 0,  hr,  0 )

        translate(this.x, this.y)

        // hint x/y axes and direction
        stroke('#ff0000')
        lineWidth(1)
        line(0, 0, 0, -1.5 * r)
        line(0, 0, 1.5 * r,  0)

        stroke('#ffff60')
        lineWidth(2)
        line(0, 0, cos(this.__.dir) * r, sin(this.__.dir) * r)

        fill('#ffff00')
        baseTop()
        alignRight()
        font(env.style.font.debug.head)
        text(`${round(this.__.x)}x${round(this.__.y)} | Z${round(this.__.Z)}`, 0, 0)

        restore()
    }

}
