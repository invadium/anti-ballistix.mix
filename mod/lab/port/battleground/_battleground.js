const _battleground = {
    Z:          9003,
    name:      'battleground',
    transient:  true,

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        return uy - this.topEdge()
    },

    nx: function(lx) {
        return lx / this.width()
    },

    ny: function(ly) {
        return ly / this.height()
    },

    /*
    nz: function(Z) {
    },
    */

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return ly + this.topEdge()
    },

    /*
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
    */

    leftEdge: function() {
        return this.__.leftEdge()
    },

    rightEdge: function() {
        return this.__.rightEdge()
    },

    topEdge: function() {
        return this.__.ground.topEdge() + this.__.ground.height() * env.tune.battleground.start
    },

    bottomEdge: function() {
        return this.topEdge() + this.__.ground.height() * env.tune.battleground.height
    },

    width: function() {
        return abs(this.rightEdge() - this.leftEdge())
    },

    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },
}
