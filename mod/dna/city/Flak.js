const Platform = require('dna/city/Platform')

let id = 0

class Flak extends Platform {

    constructor(st) {
        super( extend({
            name:   'flak' + (++id),
            r:       10,
            r2:      8,

            hull:    100,
            //dir:     math.rnda(),
            dir:     -HALF_PI,
            scanned: true,

            // specs
            maxHull:      100,
        }, st) )

        this.install([
            new dna.city.pod.SolidCircle({
                r: 15,
            }),
            new dna.city.pod.Attitude(),
            new dna.city.pod.Gun(),
            new dna.city.pod.TurretPadControl(),
        ])
    }

    capture(controllerId) {
        this.activatePod('turretPadControl')
        lab.monitor.controller.bind(controllerId, this.turretPadControl)
    }

    draw() {
        const { x, y, r, r2, dir } = this

        const bx = cos(dir),
              by = sin(dir),
              color = env.team.color(this),
              gcolor = env.team.glow(this)

        save()
        translate(x, y)
        rotate(HALF_PI + dir)

        // body
        //neon.circle(0, 0, r, color, gcolor)
        neon.line( 1.1*r,    -r,     .7*r,   r,      color, gcolor)
        neon.line( .7*r, r,      0,      .7*r,   color, gcolor)
        neon.line( 0,    .7*r,   -.7*r,  r,      color, gcolor)
        neon.line( -.7*r,r,      -1.1*r,      -r,     color, gcolor)

        // barrel
        neon.line(0, 0, 0, -r * 1.4, color, gcolor)

        super.draw()

        restore()
    }

    getStatus() {
        return `[${this.name}.${this.team}] HULL:${floor(this.hull)}/${this.maxHull}`
    }
}
