class SolidCircle {

    constructor(st) {
        extend(this, {
            type:    'solid',
            alias:   'solid',
            name:    'solidCircle',

            x:        0,
            y:        0,
            r:        1,
        }, st)
    }

    lxy(wx, wy) {
        const vec2 = this.__.lxy(wx, wy)
        // translate from body/parent coordinates to the local ones
        vec2[0] -= this.x
        vec2[1] -= this.y
        return vec2
    }

    wxy(lx, ly) {
        return this.__.pxy(lx + this.x, ly + this.y)
    }

    contact(hitter, hitterSolid, resolveContact) {
        if (hitterSolid instanceof dna.city.pod.MultiSolid) {
            for (let subSolid of hitterSolid._ls) {
                if (this.contact(hitter, subSolid, resolveContact)) return true
            }
            return false
        }

        const wxy = hitterSolid.wxy(0, 0)
        const lxy = this.lxy( wxy[0], wxy[1] )
        const dist = math.length(lxy[0], lxy[1])
        if (dist <= this.r + hitterSolid.r) {
            const contactData = {
                dist,
                lxy,
                wxy,
            }
            if (env.debug) {
                contactData.info = `[${this.__.name}@${round(this.__.x)}:${round(this.__.y)}]`
                    + ` <=> [${hitterSolid.__.name}@${round(hitterSolid.__.x)}:${round(hitterSolid.__.y)}]`
                    + ` rel::${round(lxy[0])}:${round(lxy[1])}`
            }
            resolveContact(
                this.__,
                this,
                contactData
            )
            return true
        }
        return false
    }

    draw() {
        if (!env.showSolids) return
        lineWidth(2)
        stroke('#FFFF00')
        circle(this.x, this.y, this.r)
    }
}
