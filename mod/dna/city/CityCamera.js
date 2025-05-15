class CityCamera extends dna.SlideCamera {

    constructor(st) {
        super(st)
    }

    pin() {
        const pf = env.playfield
        const targetZoom = ctx.width / pf.width
        this.scale = targetZoom

        const lhight = ctx.height / this.scale
        this.y = -.5 * lhight
    }

    evo(dt) {
        super.evo(dt)
    }

    draw() {
        this.pin()
        super.draw()
    }

}
