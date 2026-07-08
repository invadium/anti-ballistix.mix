let id = 0
class Shockwave {

    constructor(st) {
        augment(this, {
            name: 'shockwave' + (++id),

            // origin in the grid space
            x:      0,
            y:      0,   // y is fixed to the grid ground
            z:      0,
            r:      20,

            speed:  40,  // how fast the shockwave moves (in the grid space)
            force:  60,

            ranges: [],

            // max radius in the grid space
            R:      500,
        }, st)
    }

    init() {
        const grid   = this.grid = this.__.grid,
              dots   = grid.dots,
              ranges = this.ranges,
              x      = this.x,
              z      = this.z

        for (let dot of dots) {
            // MUST adjust x/7(?) to achieve a linear uniform shockwave distribution
            ranges[dot.id] = distance( x/7, z, dot.pos[0]/7, dot.pos[2] )
        }
    }

    evo(dt) {
        const _      = this,
              grid   = _.grid,
              ranges = _.ranges

        const r = _.r += _.speed * dt
        if (_.r >= _.R) {
            // this shockwave is over
            defer(() => kill(_))
        } else {
            // find untouched dots
            for (let i = ranges.length - 1; i >= 0; i--) {
                const d = ranges[i]
                if (d >= 0 && d <= r) {
                    // hit it!
                    const dot = grid.dots[i]
                    if (dot.lead) {
                        dot.lead.deform(this.force)
                        ranges[dot.lead.id] = 0
                    } else {
                        dot.deform(this.force)
                    }
                    ranges[i] = -1  // reset this item to exclude it from future deformations
                }
            }
        }
    }
}
