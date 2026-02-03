const _sky = {
    Z:          9001,
    name:      'sky',
    transient:  true,

    horizonLineSY: function() {
        return env.tune.horizonLine * ctx.height
    },

    horizonLinePY: function() {
        return this.__.ly(env.tune.horizonLine * ctx.height)
    },

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        return uy - this.horizonLinePY()
    },

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return ly + this.horizonLinePY()
    },

    leftEdge: function() { return this.__.leftEdge()
    },

    rightEdge: function() {
        return this.__.rightEdge()
    },

    topEdge: function() {
        return this.__.topEdge()
    },

    bottomEdge: function() {
        return this.horizonLinePY()
    },

    width: function() {
        return abs(this.rightEdge() - this.leftEdge())
    },

    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },

    draw: function() {
        const R = 100

        save()

        lineWidth(4)
        stroke('#00ffff')
        ctx.setLineDash([20, 20])
        rect(this.leftEdge(), this.topEdge(), this.width(), this.height())

        translate(this.ux(0), this.uy(0))

        lineWidth(8)
        ctx.setLineDash([])
        line(-R,  0, R, 0)
        line( 0, -R, 0, R)

        lineWidth(4)
        ctx.setLineDash([25, 25])
        line(this.leftEdge(), 0, this.rightEdge(), 0)


        restore()
    },
}
