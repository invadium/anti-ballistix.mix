let id = 0
class Shockwave {

    constructor(st) {
        augment(this, {
            name: 'shockwave' + (++id),

            // origin in the grid space
            x:     0,
            y:     0,   // y is fixed to the grid ground
            z:     0,
            r:     0,

            speed: 60,  // how fast the shockwave moves (in the grid space)
            force: 60,

            dist:  [],

            // max radius in the grid space
            R:     500,
        }, st)
    }

    init() {
        const grid = this.grid = this.__.grid,
              dots = grid.dots,
              dist = this.dist,
              x    = this.x,
              z    = this.z

        for (let dot of dots) {
            // MUST adjust x/7(?) to achieve a linear uniform shockwave distribution
            dist[dot.id] = distance( x/7, z, dot.pos[0]/7, dot.pos[2] )
        }
    }

    evo(dt) {
        const _    = this,
              grid = _.grid,
              dist = _.dist

        const r = _.r += _.speed * dt
        if (_.r >= _.R) {
            // this shockwave is over
            defer(() => kill(_))
        } else {
            // find untouched dots
            for (let i = dist.length - 1; i >= 0; i--) {
                const d = dist[i]
                if (d > 0 && d <= r) {
                    // hit it!
                    const dot = grid.dots[i]
                    if (dot.lead) {
                        dot.lead.elevate(this.force)
                        dist[dot.lead.id] = 0
                    } else {
                        dot.elevate(this.force)
                    }
                    dist[i] = 0
                }
            }
        }
    }
}
