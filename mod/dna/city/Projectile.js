let id = 0

const Platform = require('dna/city/Platform')

class Projectile extends Platform {

    constructor(st) {
        super( extend({
            name:     'projectile' + (++id),
            r:        5,
            lifespan: 5,
            force:    20,
        }, st) )

        this.install([
            new dna.city.pod.SolidCircle({
                r: 2.5,
            }),
            new dna.city.pod.Attitude(),
            new dna.city.pod.Thruster({
                velocity: 200,
            }),
        ])

    }

    pos() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
        }
    }

    evo(dt) {
        super.evo(dt)

        this.lifespan -= dt
        if (this.lifespan < 0) {
            kill(this)
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
        const c = env.team.color(this),
              g = env.team.glow(this)
        neon.line(0, -this.r, 0, this.r, c, g)

        super.draw()

        restore()
    }
}
