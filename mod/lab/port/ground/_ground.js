const _ground = {
    Z:          2,
    name:      'ground',
    transient:  true,

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        // determine horizon y-point in port coordinates
        return uy - this.__.bottomEdge()
    },

    nx: function(lx) {
    },

    ny: function(ly) {
    },

    nz: function(Z) {
    },

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return ly + this.__.bottomEdge()
    },

    uZ: function(nz) {
    },

    // translate ground local-relative z
    py: function py(grz) {
        const py0 = lab.port.ly( this.__.screen.horizonLineY() ),
              py1 = lab.port.ly( ctx.height )
        return (py0 + grz * (py1 - py0))
    },

    // translate to Z-order from the ground-local relative z
    Z: function Z(grz) {
        const brz = groundToBattlezoneRZ(grz)
        return 100 + brz * 100
    },

    leftEdge: function() {
        return this.__.leftEdge()
    },

    rightEdge: function() {
        return this.__.rightEdge()
    },

    topEdge: function() {
        return this.__.sky.horizonLinePY()
    },

    bottomEdge: function() {
        return this.__.ly(0)
    },

    width: function() {
        return abs(this.rightEdge() - this.leftEdge())
    },

    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },
}
