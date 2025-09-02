const Platform = require('dna/city/Platform')

let id = 0

class Flak extends Platform {

    constructor(st) {
        super( extend({
            name:   'flak' + (++id),
            r:       10,
            r1:      10,
            r2:      8,
            r3:      25,

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
            new dna.city.pod.DoubleGun({
                y0:  25,
                x1: -8,
                x2:  8,
            }),
            new dna.city.pod.TurretPadControl(),
        ])
    }

    capture(controllerId) {
        this.activatePod('turretPadControl')
        lab.monitor.controller.bind(controllerId, this.turretPadControl)
    }

    draw() {
        const { x, y, r, r1, r2, r3, dir } = this
        const bot = this.bot.isInControl()
        const occupied = this.turretPadControl.isOccupied()

        const bx = cos(dir),
              by = sin(dir)
              color = bot? env.style.color.neon.blue : env.style.color.neon.cyan

        save()
        translate(x, y)
        rotate(HALF_PI + dir)

        save()
        translate(0, -r1)

        // body front
        //neon.circle(0, 0, r, color)
        neon.line( .7*r1, r1,      0,      .7*r1,   color)
        neon.line( 0,    .7*r1,   -.7*r1,  r1,      color)

        if (bot) {
            neon.line( .7*r1, r1,      .2*r1,      r3,   color)
            neon.line(-.7*r1, r1,     -.2*r1,      r3,   color)
            neon.line(-.2*r1, r3,      .2*r1,      r3,   color)
        } else {
            neon.line( .7*r1, r1,      .4*r1,      r3,   color)
            neon.line(-.7*r1, r1,     -.4*r1,      r3,   color)
            neon.line(-.4*r1, r3,      .4*r1,      r3,   color)
        }

        if (occupied) {
            neon.line(     0, r1,          0,   .7*r3,   color)
        }

        // barrels
        neon.line( -.4*r,     r,  -.4*r,  -r,     color)
        neon.line(  .4*r,    -r,   .4*r,   r,     color)
        //neon.line(0, 0, 0, -r * 1.4, color)
        restore()

        super.draw()
        restore()
    }

    onKill() {
        // TODO Maybe each entity should notify it's pods about onKill event?
    }

    getStatus() {
        return `[${this.name}.${this.team}] HULL:${floor(this.hull)}/${this.maxHull}`
    }
}
