let id = 0

const GuidedWeapon = require('dna/city/GuidedWeapon')

class BallisticMissile extends GuidedWeapon {

    constructor(st) {
        super( extend({
            team:     2,
            name:    'ballisticMissile' + (++id),
            stat:    'ballisticMissiles',
            r:        15,
            force:    500,

            score:    50,
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

        if (target) this.gnz = target.gnz
        else this.gnz = rnd() // normalized ground-local normal depth

        //this.Z = coord.battleZone.Z(this.nz)
        //this.targetY = coord.battleZone.wy(this.nz)
        this.Z = lab.port.ground.Z(this.gnz)
        this.targetY = lab.port.ground.nzToWY(this.gnz)
    }

    airExplosion() {
        lab.port.spawn(dna.city.Explosion, {
            Z: this.Z,
            team: this.team + 1,
            x: this.x,
            y: this.y,
        })
    }

    gridWave() {
        // get the grid coordinate of the hit
        const wx   = this.x,
              wy   = this.y,
              vy   = pin.cam.grid.wyToVPY(wy),      // quasi-normalized viewport Y
              gpos = pin.cam.grid.backTrace(wx, vy)
        // touch the gird
        // const dot = pin.cam.grid.closestDot( gpos )
        // if (dot) dot.elevate()
        const shockwave = lab.port.spawn('Shockwave', {
            x:    gpos[0],
            y:    gpos[1],
            z:    gpos[2],
        })
    }

    // TODO unify with Drones and others!
    groundExplosion(Z) {
        this.gridWave()

        lab.port.spawn(dna.city.Explosion, {
            Z:          Z ?? this.Z,
            team:       this.team,
            x:          this.x,
            y:          this.y,
            force:      8,
            baseAngle:  .1 * PI,
            spread:    .9 * PI,
        })
    }

    hit(source) {
        if (source instanceof dna.city.Projectile) {
            kill(this, source)
            kill(source)
            this.airExplosion()
        }
    }

    evo(dt) {
        super.evo(dt)

        //if (this.y >= cry(this.targetCRY)) {
        if (this.y <= this.targetY) {
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

        neon.line(-hw, -r2,   0,  -r, c)
        neon.line( hw, -r2,   0,  -r, c)
        neon.line(-hw, -r2, -hw,   r, c)
        neon.line( hw, -r2,  hw,   r, c)
        neon.line(-hw,  r,   hw,   r, c)

        super.draw()

        restore()
    }

    onKill(killer) {
        env.stat.kill(this, killer)
        trap('mission/kill', this)
    }
}
