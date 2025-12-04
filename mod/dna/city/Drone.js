let id = 0

const GuidedWeapon = require('dna/city/GuidedWeapon')

const FLYING = 1,
      DIVING = 2

class Drone extends GuidedWeapon {

    constructor(st) {
        super( extend({
            team:      2,
            name:     'drone' + (++id),
            stat:     'drones',
            state:     FLYING,
            r:         15,
            powerTime: 15 + 45 * rnd(),
            force:     50,

            diveAcceleration: 50,

            score:     10,
            bounty:    50,
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
                velocity: 100,
            }),

            // TODO inject precision config
            new dna.city.pod.TargetingPod(),
        ])

        this.nz = rnd() // normalized battlezone depth
        this.adjustZ()
    }

    adjustZ() {
        this.Z = lab.overlord.battleZone.Z(this.nz)
        this.targetY = lab.overlord.battleZone.py(this.nz)
    }

    airExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            team: this.team + 1,
            x: this.x,
            y: this.y,
        })
    }

    groundExplosion(Z) {
        lab.port.spawn(dna.city.Explosion, {
            Z:          Z ?? this.Z,
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
            // intercepted!!!
            kill(this, source)
            kill(source)
            this.airExplosion()
        }
    }

    flip() {
        if (this.dir === 0) this.dir = PI
        else this.dir = 0
    }

    dive() {
        this.state = DIVING

        // nose down
        if (this.dir === 0) this.dir = .25 * PI
        else this.dir = .75 * PI

        const target = this.targeting.lockOnTarget()
        if (target) {
            this.nz = target.bz
            this.adjustZ()
        }
    }

    evo(dt) {
        super.evo(dt)

        switch(this.state) {
            case FLYING:
                this.powerTime -= dt
                if (this.dir === 0 && this.x > crx(100)) this.flip()
                if (this.dir === PI && this.x < -crx(100)) this.flip()

                if (this.powerTime < 0) {
                    this.dive()
                }
                break

            case DIVING:
                this.thruster.velocity += this.diveAcceleration * dt
                break
        }

        if (this.y >= this.targetY) {
            // ground hit
            kill(this, 'ground')
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

        neon.line(-hw, -r2,   0,  -r, c) // x2 nose cone
        neon.line( hw, -r2,   0,  -r, c)
        neon.line(-hw, -r2, -hw,   r, c)
        neon.line( hw, -r2,  hw,   r, c)
        neon.line(-hw,  r,   hw,   r, c)
        neon.line(  0, -.4*r, 0,  2*r, c)  // wing

        super.draw()

        restore()
    }

    onKill(killer) {
        env.stat.kill(this, killer)
        trap('mission/kill', this)
    }

}
