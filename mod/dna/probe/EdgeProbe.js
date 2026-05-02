let id = 0

class EdgeProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'edgeProbe' + (++id),

            style: {
                color:     '#ffffff',
                lineWidth:  5,
                dash:      [ 20, 20 ],
            },
        }, st)
    }

    draw() {
        const __ = this.__

        save()

        stroke(this.style.color)
        lineWidth(this.style.lineWidth)
        ctx.setLineDash(this.style.dash)
        rect(__.leftEdge(), __.topEdge(), __.width(), __.height())

        const le = __.leftEdge()
        const te = __.topEdge()
        const W = __.width()
        const H = __.height()
        rect(0, 0, 100, 100)

        restore()
    }

}
