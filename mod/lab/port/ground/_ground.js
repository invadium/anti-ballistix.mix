// define the ground space - everything from the botton to the horizon line
//
// Note: need it to be a LabFrame to attach coord probes
const _ground = {
    Z:          9002,
    name:      'ground',
    cartesian:  true,
    transient:  true,


    init: function() {
        at.g = this
    },

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        return -(uy - this.bottomEdge())
        // return uy - this.__.sky.horizonLineWY()
    },

    nx: function(lx) {
        return lx / (.5 * this.width())
    },

    ny: function(ly) {
        return ly / this.height()
    },

    nz: function(Z) {
    },

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return -ly + this.bottomEdge()
        //return ly + this.__.sky.horizonLineWY()
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
        return this.__.sky.horizonLineWY()
    },

    bottomEdge: function() {
        return this.__.bottomEdge()
        //return this.__.ly(ctx.height)
    },

    width: function() {
        return this.__.width()
        // return abs(this.rightEdge() - this.leftEdge())
    },

    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },
}
