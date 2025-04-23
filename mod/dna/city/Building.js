let id = 0

const Body = require('dna/city/Body')

class Building extends Body {

    constructor(st) {
        super( augment({
            name: 'building' + (++id)
        }, st) )
        const W  = ctx.width,
              BY = env.tune.horizonLine * ctx.height - env.tune.citySkyLine * ctx.height,
              BH = env.tune.cityBaseHeight * ctx.height,  // expected to be <= BY
              FH = env.tune.building.floorHeight * BH,
              bh = env.tune.building.baseHeight * ctx.height,
              vh = env.tune.building.varHeight * ctx.height,
              bw = env.tune.building.baseWidth * ctx.height,
              vw = env.tune.building.varWidth * ctx.height
              
        this.x = this.rx * W
        this.y = BY + this.rz * BH
        this.z = this.rz
        this.Z = round(this.z * 1000)

        this.w = bw + this.rw * (.5 + .5*this.z) * vw
        this.h = bh + this.rh * vh
        this.floorHeight = FH
        this.windowHeight = FH * env.tune.building.windowHeight
        this.floors = floor(this.h / FH) - 2
    }

    draw() {
        save()
        translate(.5 * ctx.width, env.tune.horizonLine * ctx.height)

        const { x, y, z, w, h, floorHeight, windowHeight } = this
        const hw = .5 * w

        fill(
            .85 - .18 * z,
            .50 - .30 * z,
            .35 - .22 * z
        )
        rect( x - hw, y - h, w, h )

        fill(
            .8 + .4 * z,
            .2 + .2 * z,
            .45 + .15 * z
        )

        const WH = windowHeight
        let by = y - floorHeight
        for (let i = 0; i < this.floors; i++) {
            rect( x - hw + 2*WH, by, w - 4*WH, WH )
            by -= floorHeight
        }

        super.draw()

        restore()
    }

}
