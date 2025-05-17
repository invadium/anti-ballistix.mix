let id = 0

const Platform = require('dna/city/Platform')

class BallisticMissile extends Platform {

    constructor(st) {
        super( extend({
            team:     2,
            name:    'ballisticMissile' + (++id),
            r:        15,
            lifespan: 5,
            force:    500,
        }, st) )

        this.install([
            // noze code solid
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid1',
                x:      0,
                y:     -6,
                r:      5,
            }),
            // engine solid
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid2',
                x: 0,
                y: 7,
                r: 7,
            }),
            new dna.city.pod.MultiSolid(),

            new dna.city.pod.Attitude(),
            new dna.city.pod.Thruster({
                velocity: 200,
            }),
        ])

        this.targetCRY = 10 + 20 * rnd()
    }

    airExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            team: this.team + 1,
            x: this.x,
            y: this.y,
        })
    }

    groundExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            team:       this.team,
            x:          this.x,
            y:          this.y,
            force:      8,
            baseAngle:  1.1 * PI,
            spread:    .9 * PI,
        })
    }

    hit(source) {
        if (source instanceof dna.city.Projectile) {
            kill(this)
            kill(source)
            this.airExplosion()
        }
    }

    evo(dt) {
        super.evo(dt)

        if (this.y >= cry(this.targetCRY)) {
            // ground hit
            kill(this)
            this.groundExplosion()
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
