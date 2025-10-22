class CityCamera extends dna.SlideCamera {

    constructor(st) {
        super(st)
    }

    lookupZombie(targetDNA) {
        for (let i = this._ls.length - 1; i >= 0; i--) {
            const e = this._ls[i]
            if (e.dead && (e instanceof targetDNA)) return e
        }
    }

    spawn(targetDNA, st) {
        if (isClass(targetDNA) && targetDNA.respawnable) {
            // look for a zoombie with the same dna
            const zombie = this.lookupZombie(targetDNA)
            if (zombie) return zombie.respawn(st)
        } 
        return dna.SlideCamera.prototype.spawn.call(this, targetDNA, st)
    }

    pin() {
        const pf = env.playfield
        const targetZoom = ctx.width / pf.width
        this.scale = targetZoom

        const lhight = ctx.height / this.scale
        this.y = -.5 * lhight
    }

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

        let sx = this.gx(x)
        let sy = this.gy(y)
        let sr = this.gx(r || 0)

        return (sx+r >= x1 && sx-r <= x2 && sy+r >= y1 && sy-r <= y2)
    }

    evo(dt) {
        super.evo(dt)
    }

    draw() {
        this.pin()
        super.draw()
    }

}
