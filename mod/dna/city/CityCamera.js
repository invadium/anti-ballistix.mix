class CityConstraint {

    constructor(st) {
        augment(this, {
            name:      'cityConstraint',

            transient:  true,
        }, st)
    }

    evo(dt) {
        const cam = this.__
        const sky = cam.sky
        const pf  = env.playfield
        const targetZoom = lab.w / pf.width
        // this.scale = targetZoom
        cam.zoom = targetZoom
        pf.adjust()

        // this.y = -.5 * lhight
        // cam.pos.y = .5 * lhight
        const dy = sky.horizonLineCY() / cam.zoom
        // cam.pos.y = -dy
        cam.pos.y = dy
    }
}

class CityCamera extends dna.SlideCameraNG {

    constructor(st) {
        super(st)
        this.attach( new CityConstraint() )
    }

    lookupZombie(targetDNA) {
        for (let i = this._ls.length - 1; i >= 0; i--) {
            const e = this._ls[i]
            if (e.dead && (e instanceof targetDNA)) return e
        }
    }

    // customized spawn function with entity respawn capability
    spawn(targetDNA, st) {
        if (isClass(targetDNA) && targetDNA.respawnable) {
            // look for a zoombie with the same dna
            const zombie = this.lookupZombie(targetDNA)
            if (zombie) {
                zombie.respawn(st)
                return zombie
            }
        } 
        return dna.SlideCamera.prototype.spawn.call(this, targetDNA, st)
    }

    /*
    pin() {
        const pf = env.playfield
        const targetZoom = ctx.width / pf.width
        // this.scale = targetZoom
        this.zoom = targetZoom

        const lhight = ctx.height / this.scale
        this.y = -.5 * lhight
    }
    */

    // check if local coordinates are in the viewport
    // @param {number} x - local x
    // @param {number} y - local y
    // @param {number} r - local r
    // @returns {boolean} - true if local x:y are in the viewport
    inView(x, y, r) {
        const edge = 0,
              x1 = edge,
              x2 = ctx.width - edge,
              y1 = edge,
              y2 = ctx.height - edge

        // translate arguments to the screen coordinate space
        let sx = this.ux(x)
        let sy = this.uy(y)
        let sr = this.ux(r || 0)

        return (sx+r >= x1 && sx-r <= x2 && sy+r >= y1 && sy-r <= y2)
    }

    // left edge x in local coordinate space
    leftEdge() {
        return this.lx(0)
    }

    // right edge x in local coordinate space
    rightEdge() {
        return this.lx(ctx.width)
    }

    // top edge y in local coordinate space
    topEdge() {
        return this.ly(0)
    }

    // bottom edge y in local coordinate space
    bottomEdge() {
        return this.ly(ctx.height)
    }

    width() {
        return abs(this.rightEdge() - this.leftEdge())
    }

    height() {
        return abs(this.bottomEdge() - this.topEdge())
    }

    evo(dt) {
        super.evo(dt)
    }

    draw() {
        // this.pin()
        // TODO flip the coordinate system to make the bottom 0 and grow up?
        // save()
        // scale(1, -1)
        super.draw()
        // restore()
    }

}
