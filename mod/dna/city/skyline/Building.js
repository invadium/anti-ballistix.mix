let id = 0

const Body = require('dna/city/Body')

class Building extends Body {

    constructor(st) {
        super( augment({
            name:       'building' + (++id),
            powerState:  true,
        }, st) )
        const W  = ctx.width,
              H  = ctx.height,
              BY = env.tune.citySkyLine * H,
              BH = env.tune.cityBaseHeight * H,  // expected to be <= BY
              FH = env.tune.building.floorHeight * BH,
              bh = env.tune.building.baseHeight * H,
              vh = env.tune.building.varHeight * H,
              bw = env.tune.building.baseWidth * H,
              vw = env.tune.building.varWidth * H 
              
        this.x = this.rx * W
        //this.y = BY + this.rz * BH
        this.y = 0

        this.z = this.rz
        this.Z = round(this.z * 1000)

        this.w = bw + this.rw * (.5 + .5*this.z) * vw
        this.h = bh + this.rh * vh
        this.floorHeight = FH
        this.windowHeight = FH * env.tune.building.windowHeight
        this.floors = floor(this.h / FH) - 2
    }

    cutOff() {
        this.powerState = false
    }

    powerOn() {
        this.powerState = true
    }

    draw() {
        save()
        // move to the horizon coordinate system
        translate(.5 * ctx.width, env.tune.horizonLine * ctx.height)

        const { x, y, z, w, h, floorHeight, windowHeight } = this
        const hw = .5 * w

        fill(
            .85 - .18 * z,
            .50 - .30 * z,
            .35 - .22 * z
        )
        rect( x - hw, y - h, w, h )

        // render windows
        if (this.powerState) {
            fill(
                .8 + .4 * z,
                .2 + .2 * z,
                .45 + .15 * z
            )
        } else {
            fill(
                .85 - .18 * z, // H
                .50 - .30 * z, // S
                .32 - .22 * z  // L
            )
        }

        const WH = windowHeight
        let by = y - floorHeight
        for (let i = 0; i < this.floors; i++) {
            // window
            rect( x - hw + 2*WH, by, w - 4*WH, WH )
            by -= floorHeight
        }

        super.draw()

        restore()
    }

}
