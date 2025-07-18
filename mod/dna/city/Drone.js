let id = 0

const GuidedWeapon = require('dna/city/GuidedWeapon')

const FLYING = 1,
      DIVING = 2

class Drone extends GuidedWeapon {

    constructor(st) {
        super( extend({
            team:      2,
            name:     'drone' + (++id),
            state:     FLYING,
            r:         15,
            powerTime: 15 + 45 * rnd(),
            force:     50,

            score:     10,
            cost:      50,
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
            // tail solid
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid3',
                x:      0,
                y:     20,
                r:      5,
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

    flip() {
        if (this.dir === 0) this.dir = PI
        else this.dir = 0
    }

    evo(dt) {
        super.evo(dt)

        switch(this.state) {
            case FLYING:
                this.powerTime -= dt
                if (this.dir === 0 && this.x > crx(100)) this.flip()
                if (this.dir === PI && this.x < -crx(100)) this.flip()

                if (this.powerTime < 0) {
                    this.state = DIVING

                    if (this.dir === 0) this.dir = .25 * PI
                    else this.dir = .75 * PI
                }
                break

            case DIVING:
                break
        }

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

        neon.line(-hw, -r2,   0,  -r, c, g) // x2 nose cone
        neon.line( hw, -r2,   0,  -r, c, g)
        neon.line(-hw, -r2, -hw,   r, c, g)
        neon.line( hw, -r2,  hw,   r, c, g)
        neon.line(-hw,  r,   hw,   r, c, g)
        neon.line(  0, -.4*r, 0,  2*r, c, g)  // wing

        super.draw()

        restore()
    }

    onKill() {
        trap('game/kill', this)
    }

}
