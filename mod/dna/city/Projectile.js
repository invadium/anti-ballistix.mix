let id = 0

const Platform = require('dna/city/Platform')

const df = {
    Z:        4000,
    r:        5,
    force:    20,
    dead:     false,
    player:   0,
    source:   null,
}

class Projectile extends Platform {

    constructor(st) {
        super( extend({
            name: 'projectile' + (++id),
        }, df, st) )

        this.install([
            new dna.city.pod.SolidCircle({
                r: 5,
            }),
            new dna.city.pod.Attitude(),
            new dna.city.pod.Thruster({
                velocity: 200,
            }),
            new dna.city.pod.OutOfRangeKillSwitch({
                r: 10,
            }),
            new dna.city.pod.LifespanKillSwitch({
                timer: 20,
            }),
        ])

        // TODO MUST be decoupled for direct reference to the stat
        lab.overlord.stat.shot()
    }

    respawn(st) {
        extend(this, df, st)
        this.lifespanKillSwitch.respawn({
            timer: 20,
        })
    }

    pos() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(HALF_PI + this.dir)

        //let c = hsl(0, 0, .9)
        /*
        switch (this.team) {
        case 1: c = hsl(.7, .7, .6); break
        case 2: c = hsl(.1, .7, .6); break;
        }
        */
        /*
        stroke(c)
        lineWidth(3)
        line(0, -this.r, 0, this.r)
        */

        const color = rgb(1, 1 - .75*this.temp, 0)
        neon.line(0, -this.r, 0, this.r, color)

        super.draw()

        restore()
    }

    kill() {
        this.dead = true
    }
}
Projectile.respawnable = true
