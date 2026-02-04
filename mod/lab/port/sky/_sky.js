
function horizonLineSY() {
    return env.tune.horizonLine * ctx.height
}

const _sky = {
    Z:          9001,
    name:      'sky',
    transient:  true,

    horizonLineSY,

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

    screenWidth: function() {
        return ctx.width
    },

    screenHeight: horizonLineSY,
}
