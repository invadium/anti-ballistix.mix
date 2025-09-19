let id = 0

const GuidedWeapon = require('dna/city/GuidedWeapon')

class BallisticMissile extends GuidedWeapon {

    constructor(st) {
        super( extend({
            team:     2,
            name:    'ballisticMissile' + (++id),
            r:        15,
            force:    500,

            score:    100,
            cost:     1000,
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

            // TODO inject precision config
            new dna.city.pod.TargetingPod(),
        ])

        // try to lock on target
        const target = this.targeting.lockOnTarget()

        if (target) this.nz = target.bz
        else this.nz = rnd() // normalized battlezone depth

        this.Z = lab.overlord.battleZone.Z(this.nz)
        this.targetY = lab.overlord.battleZone.py(this.nz)
    }

    airExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            Z: this.Z,
            team: this.team + 1,
            x: this.x,
            y: this.y,
        })
    }

    groundExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            Z:          this.Z,
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

        //if (this.y >= cry(this.targetCRY)) {
        if (this.y >= this.targetY) {
            // ground hit
            kill(this)
            this.groundExplosion()
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(HALF_PI + this.dir)

        const c  = env.style.color.neon.red,
              r  = this.r,
              hw = .4 * r,
              r2 = .4 * r

        neon.line(-hw, -r2,   0,  -r, c)
        neon.line( hw, -r2,   0,  -r, c)
        neon.line(-hw, -r2, -hw,   r, c)
        neon.line( hw, -r2,  hw,   r, c)
        neon.line(-hw,  r,   hw,   r, c)

        super.draw()

        restore()
    }

    onKill() {
        trap('game/kill', this)
    }
}
