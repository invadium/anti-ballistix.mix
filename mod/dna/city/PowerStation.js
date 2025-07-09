
const Platform = require('dna/city/Platform')

let id = 0
class PowerStation extends Platform {

    constructor(st) {

        super( extend({
            name:    'powerStation' + (++id),
            r:        200,
            maxHP:    1500,
            maxPower: 100,
        }, st) )
        this.hp = this.maxHP

        this.install([
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid1',
                x: 0,
                y: 0,
                r: 30,
                onDeactivate: function() {
                    this.hidden = false
                },
            }),
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid2',
                x: -60,
                y: 0,
                r: 30,
                onDeactivate: function() {
                    this.hidden = false
                },
            }),
            new dna.city.pod.SolidCircle({
                alias: '',
                name:  'solid3',
                x: 60,
                y: 0,
                r: 30,
                onDeactivate: function() {
                    this.hidden = false
                },
            }),
            new dna.city.pod.MultiSolid(),
            /*
            new dna.city.pod.SolidCircle({
                name:  'solid2',
                x: -100,
                y: 0,
                r: 50,
            }),
            new dna.city.pod.SolidCircle({
                name:  'solid3',
                x: 100,
                y: 0,
                r: 50,
            }),
            */
        ])
    }

    damage(force) {
        this.hp -= force
        //if (this.hp <= 0) kill(this)
    }

    hit(hitter) {
        if (hitter.team !== this.team && hitter instanceof dna.city.GuidedWeapon) {
            lib.vfx.hitDebris(hitter.x, hitter.y, hitter.force, env.style.color.powerStation)
            kill(hitter)
            hitter.groundExplosion()

            this.damage(hitter.force)
        }
    }

    draw() {
        const H  = ctx.height,
              PY = (env.tune.horizonLine + this.ry) * H,
              x  = this.x,
              y  = lab.port.ly(PY)

        // normalize y
        this.y = y

        save()
        translate(x, y)
        //rotate(HALF_PI + this.dir)

        const c  = env.team.color(this),
              g  = env.team.glow(this),
              r  = this.r,
              w  = r,
              h  = .3 * r,
              hw = .5 * w,
              hh = .5 * h

        //fill(.7, .2, .1)
        fill(env.style.color.powerStation)
        //neon.rect(-hw, -hh, w, h, c, g)
        //neon.rect(-.6 * hw, -1.05 * h, .7*w, .5*h, c, g)

        rect(-hw, -hh, w, h)

        if (this.hp <= 0) {
            // show destroyed
            let bx = -.6 * hw
            const sx = .3 * .7 * w
            for (let i = 0; i < 3; i++) {
                triangle(
                    bx,        -0.5 * h,
                    bx+.25*sx, -1.0 * h,
                    bx+sx,     -0.5 * h,
                )
                bx += sx
            }
        } else {
            rect(-.6 * hw, -1 * h, .7*w, .5*h)

            let hp = this.hp,
                pipeHP = this.maxHP / 3,
                bx = -.4 * hw,
                pw = .1 * w,
                ps = .4 * hw,
                PH = 1.5 * h
            let by, ph
            for (let i = 0; i < 3; i++) {
                //neon.rect(bx, by, pw, ph)
                if (hp >= pipeHP) {
                    // full pipe height
                    ph = PH
                    by = -h - ph,
                    hp -= pipeHP
                } else {
                    const dmgRate = hp/pipeHP,
                          yShift  = .9 * PH * dmgRate
                    ph = .1 * PH + yShift
                    by = -h - ph
                    hp = 0
                }
                rect(bx, by, pw, ph)
                bx += ps
            }
        }

        super.draw()

        restore()
    }

    getNormalHealth = function() {
        if (this.hp <= 0) return 0
        return this.hp / this.maxHP
    }

    getCurrentPower() {
        return this.maxPower * this.getNormalHealth()
    }
}
