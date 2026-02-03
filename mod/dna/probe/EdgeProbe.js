let id = 0

class EdgeProbe {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'edgeProbeedgeProbeedgeProbe' + (++id),

            style: {
                color:     '#ffffff',
                lineWidth:  5,
            },
        }, st)
    }

    draw() {
        const __ = this.__

        stroke(this.style.color)
        lineWidth(this.style.lineWidth)
        ctx.setLineDash([20, 20])
        rect(__.leftEdge(), __.topEdge(), __.width(), __.height())
    }

}
