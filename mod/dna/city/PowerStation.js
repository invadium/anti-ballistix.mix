
const Platform = require('dna/city/Platform')

let id = 0
class PowerStation extends Platform {

    constructor(st) {
        super( extend({
            name: 'powerStation' + (++id),
            r:     200,
        }, st) )


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

    hit(source) {
        if (source instanceof dna.city.BallisticMissile) {
            kill(this)
            kill(source)
            source.groundExplosion()
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

        fill(.7, .2, .1)
        //neon.rect(-hw, -hh, w, h, c, g)
        //neon.rect(-.6 * hw, -1.05 * h, .7*w, .5*h, c, g)
        rect(-hw, -hh, w, h, c, g)
        rect(-.6 * hw, -1 * h, .7*w, .5*h, c, g)

        let bx = -.4 * hw,
            by = -2.5*h,
            pw = .1 * w,
            ph = 1.5 * h,
            ps = .4 * hw
        for (let i = 0; i < 3; i++) {
            //neon.rect(bx, by, pw, ph)
            rect(bx, by, pw, ph)
            bx += ps
        }

        super.draw()

        restore()
    }
}
