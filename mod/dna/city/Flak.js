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
            rdy:     8,

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
                x1: -5,
                x2:  5,
            }),
            new dna.city.pod.TurretPadControl(),
        ])
    }

    capture(controllerId) {
        this.activatePod('turretPadControl')
        lab.monitor.controller.bind(controllerId, this.turretPadControl)
    }

    draw() {
        const gun = this.gun
        if (this.gun.lock && (env.time - this.gun.lockTimestamp) % 1 < .5) return // overheat timeout flashing

        const { x, y, r, r1, r2, r3, dir } = this
        const bot = this.bot.isInControl()
        const occupied = this.turretPadControl.isOccupied()
        const temp = gun.temp

        const bx = cos(dir),
              by = sin(dir)
              color = bot? env.style.color.neon.blue : env.style.color.neon.cyan

        save()
        translate(x, y)
        rotate(HALF_PI + dir)

        save()
        translate(0, -r1)

        // body front
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
        const g = bot? 0.7 : 1
        const bcolor = rgb(temp, g * (1 - .4*temp), 1 - .8*temp)
        const flashColor = rgb(1, 1 - .75*temp, 0)

        const dy0 = (1 - min((env.time - gun.lastShot0) / gun.rechargeTime, 1)) * this.rdy
        neon.line( -.4*r,     r+dy0,  -.4*r,  -r+dy0,     bcolor)
        // muzzle flash 0
        const flash0 = (env.time - gun.lastShot0) / gun.flashTime
        if (flash0 < 1) neon.circle( -.4*r, -1.5 * r, gun.flashRadius * flash0, flashColor)

        const dy1 = (1 - min((env.time - gun.lastShot1) / gun.rechargeTime, 1)) * this.rdy
        neon.line(  .4*r,     r+dy1,   .4*r,  -r+dy1,     bcolor)
        const flash1 = (env.time - gun.lastShot1) / gun.flashTime
        if (flash1 < 1) neon.circle( .4*r, -1.5 * r, gun.flashRadius * flash1, flashColor)
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
