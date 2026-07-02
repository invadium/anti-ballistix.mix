const Target = require('dna/city/Target')

let id = 0
class PowerStation extends Target {

    constructor(st) {

        super( extend({
            name:    'powerStation' + (++id),
            r:        200,
            maxHP:    1500,
            maxPower: 100,
            visual: {
                x: -100,
                y: -30,
                w:  200,
                h:  180,
                _centered:    false,
                _rectangular: true,
            },

            dx:       0,
            dy:       0,
        }, st) )
        this.hp = this.maxHP
        // calculate ground-local normal z and determine the Z-order
        // this.gnz = env.tune.powerZone.start + this.z * (env.tune.powerZone.end - env.tune.powerZone.start)
        // this.Z  = lab.port.ground.Z(this.gnz) + 8 // dirty-trick to adjust to the proper Z-order to consider the bottom part

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

    adjust() {
        const dot  = this.dot,
              next = dot.next

        this.x = .5 *(dot.wPos[0] + next.wPos[0])
        this.y = dot.wPos[1] + 32
        this.Z = dot.row.Z - .1
        this.gnz = dot.row.groundNZ
    }

    pinToGrid(dot) {
        this.dot = dot
        dot.attach(this)
        dot.next.attach(this)
        dot.syncWith(dot.next)
    }

    unpinFromGrid() {
        this.dot.releaseFollower()
        this.dot.next.detach()
        this.dot.detach()
        this.dot = null
    }

    pushOut(N) {
        const lastDot = this.dot
        this.unpinFromGrid()
        const dot = lastDot.pushOut(this, N)
        if (!dot) throw new Exception(`Can't pin [${this.name}] to the grid`)
        this.pinToGrid(dot)
    }

    damage(force) {
        this.hp -= force
        //if (this.hp <= 0) kill(this)
    }

    hit(hitter) {
        const _ = this

        if (hitter.team !== this.team && hitter instanceof dna.city.GuidedWeapon && abs(hitter.Z - this.Z) < 10) {
            defer(() => {
                lib.vfx.hitDebris(hitter.x, hitter.y, this.Z + 1, hitter.force, env.style.color.powerStation)
                hitter.groundExplosion(_.Z + 1, _)
            })
            kill(hitter, this)

            this.damage(hitter.force)
            /*
            job.kinetix.tween( (v, t) => {
                    _.dy = -v * 25 * ((5 - t)/5)
                }, (t, time) => sin(time * TAU))
                .steps(5)
            */
        }
    }

    autoKill() {
        const force = this.hp
        lib.vfx.hitDebris(this.x, this.y, force, env.style.color.powerStation)
        this.damage(force)
    }

    draw() {
        this.adjust()

        const c  = env.team.color(this),
              g  = env.team.glow(this),
              r  = this.r,
              w  = r,
              h  = .3 * r,
              hw = .5 * w,
              hh = .5 * h,
              H  = ctx.height,
              x  = this.x,
              y  = this.y,
              // y  = coord.battleZone.wy(this.gnz) - hh,
              // y  = lab.port.ground.nzToWY(this.gnz),
              dx = this.dx,
              dy = this.dy

        save()
        translate(x + dx, y + dy)

        save()
        rotate(PI)

        // adjust y to match ground-normal z
        // this.y = y

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

        restore()
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

    clearDot() {
        this.dot = null
    }

    pick(x, y, ls, predicate) {
        const _   = this,
              vis = this.visual
        const lx = x - _.x - vis.x
        const ly = y - _.y - vis.y

        if (lx >= 0 && lx < vis.w && ly >= 0 && ly < vis.h) {
            if (!predicate || predicate(this)) {
                ls.push(this)
                return this
            }
        }
    }
}
