// define the ground space - everything from the botton to the horizon line
//
// Note: need it to be a LabFrame to attach coord probes
const _ground = {
    Z:          9002,
    name:      'ground',
    cartesian:  false,
    transient:  true,

    init: function() {
        at.g = this
    },

    lx: function(ux) {
        return ux
    },

    ly: function(uy) {
        return uy - this.bottomEdge()
    },

    nx: function(ux) {
        return this.lx(ux) / (.5 * this.width())
    },

    ny: function(uy) {
        return this.ly(uy) / this.height()
    },

    nz: function(uy) {
        return this.ly(uy) / this.height()
    },

    ux: function(lx) {
        return lx
    },

    uy: function(ly) {
        return ly + this.bottomEdge()
    },

    uZ: function(nz) {
    },

    // translate the ground-local normal z (0-1 to the horizon) to the world space Y
    nzToWY: function (gnz) {
        //const py0 = lab.port.ly( this.__.screen.horizonLineY() ),
        //      py1 = lab.port.ly( ctx.height )
        // return (py0 + gnz * (py1 - py0))
        // if (gnz === 0) return this.bottomEdge()
        //
        // return this.ly(uy) / this.height()
        return this.uy(gnz * this.height())
    },

    // translate to Z-order from the ground-local normalize z
    Z: function Z(gnz) {
        return 100 + (1-gnz) * 100
    },

    // left edge in the world space
    leftEdge: function() {
        return this.__.leftEdge()
    },

    // right edge in the world space 
    rightEdge: function() {
        return this.__.rightEdge()
    },

    // top edge in the world space
    topEdge: function() {
        return this.__.sky.horizonLineWY()
    },

    // bottom edge in the world space
    bottomEdge: function() {
        return this.__.bottomEdge()
        //return this.__.ly(ctx.height)
    },

    // world-space width
    width: function() {
        return this.__.width()
        // return abs(this.rightEdge() - this.leftEdge())
    },

    // world-space height
    height: function() {
        return abs(this.bottomEdge() - this.topEdge())
    },
}
