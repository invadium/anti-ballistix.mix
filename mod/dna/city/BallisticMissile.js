let id = 0

const Platform = require('dna/city/Platform')

class BallisticMissile extends Platform {

    constructor(st) {
        super( extend({
            name:     'ballisticMissile' + (++id),
            r:        15,
            lifespan: 5,
            force:    20,
        }, st) )

        this.install([
            new dna.city.pod.SolidCircle({
                r: 5,
            }),
            new dna.city.pod.Attitude(),
            new dna.city.pod.Thruster({
                velocity: 200,
            }),
        ])
    }

    hit(source) {
        if (source instanceof dna.city.Projectile) {
            kill(this)
        }
    }

    evo(dt) {
        super.evo(dt)


        if (this.y >= cry(20)) {
            // ground hit
            kill(this)
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(HALF_PI + this.dir)

        const c  = env.team.color(this),
              g  = env.team.glow(this),
              r  = this.r,
              hw = .4 * r,
              r2 = .4 * r

        neon.line(-hw, -r2,   0,  -r, c, g)
        neon.line( hw, -r2,   0,  -r, c, g)
        neon.line(-hw, -r2, -hw,   r, c, g)
        neon.line( hw, -r2,  hw,   r, c, g)
        neon.line(-hw,  r,   hw,   r, c, g)

        super.draw()

        restore()
    }

}
