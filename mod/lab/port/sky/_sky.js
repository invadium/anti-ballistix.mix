// horizon line in the screen space
function horizonLineSY() {
    return env.tune.horizonLine * ctx.height
}

// defines the coordinate space above the horizon line
//
// Note: need it to be a LabFrame to attach coord probes
const _sky = {
    Z:          9001,
    name:      'sky',
    cartesian:  false,
    transient:  true,

    init: function() {
        at.sky = this
    },

    // horizon line in the screen space
    horizonLineSY,

    // horizon line in the camera viewport space (centered)
    horizonLineCY: function() {
        return (env.tune.horizonLine - .5) * ctx.height
    },

    // horizon level in the world space - MUST be 0!
    horizonLineWY: function() {
        return this.__.ly(env.tune.horizonLine * ctx.height)
    },

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        return uy
        // return uy - this.topEdge()
        // return -(uy - this.horizonLineWY())
        // return -(uy - this.__.sky.horizonLineWY())
        // return uy - this.horizonLineWY()
    },

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return ly
        //return -ly + this.horizonLineWY()
        //return -(ly + this.__.sky.horizonLineWY())
    },

    // world coordinates left edge
    leftEdge: function() {
        return this.__.leftEdge()
    },

    // world coordinates right edge
    rightEdge: function() {
        return this.__.rightEdge()
    },

    // world coordinates top edge
    topEdge: function() {
        return this.__.topEdge()
    },

    // world coordinates bottom edge
    bottomEdge: function() {
        return this.horizonLineWY()
    },

    width: function() {
        return abs(this.rightEdge() - this.leftEdge())
    },

    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },

    screenWidth: function() {
        // TODO could be different for non-fullscreen viewports!
        return ctx.width
    },

    // TODO could be different for non-fullscreen viewports!
    screenHeight: horizonLineSY,
}
