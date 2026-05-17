class VaporDot {

    constructor(st) {
        extend(this, {
            pos: [0, 0, 0],
        })
        this.grid = st.grid
        if (st && isNum(st.x)) {
            this.pos[0] = st.x
            this.pos[1] = st.y
            this.pos[2] = st.z
        }
        this.at = [...this.pos]
    }

    evo(dt) {
        const FQ = .05
        const JUMP = 200
        const JUMP_DY = 200
        const DY = 100

        if (this.push) {
            this.pos[1] += JUMP_DY * dt
            this.push -= JUMP_DY * dt
            if (this.push <= 0) this.push = 0
        } else {
            if (this.pos[1] > this.at[1]) {
                this.pos[1] -= DY * dt
                if (this.pos[1] < this.at[1]) {
                    this.pos[1] = this.at[1]
                }
            }
        }

        if (rnd() < FQ * dt) {
            this.push = JUMP
        }
    }

    draw() {
        const grid = this.grid
        const pos = this.pos
        if (pos[3] < 1) return

        const screenPos = grid.project(pos)
        grid.vpToWorld(screenPos)

        const descale = 1/lab.port.zoom

        /*
        const R = 3 * descale
        fill('#ffff00')
        rect(screenPos[0] - .5*R, screenPos[1] - .5*R, R, R)
        */

        if (this.next) {
            const nsPos = grid.project(this.next.pos)
            grid.vpToWorld(nsPos)
            lineWidth(descale)
            stroke(env.style.color.grid)
            line(screenPos[0], screenPos[1], nsPos[0], nsPos[1])
        }
        /*
        if (this.top) {
            const tsPos = grid.project(this.top.pos)
            grid.vpToWorld(tsPos)
            lineWidth(descale)
            stroke(env.style.color.grid)
            line(screenPos[0], screenPos[1], tsPos[0], tsPos[1])
        }
        */
        if (this.bottom) {
            const tsPos = grid.project(this.bottom.pos)
            grid.vpToWorld(tsPos)
            lineWidth(descale)
            stroke(env.style.color.grid)
            line(screenPos[0], screenPos[1], tsPos[0], tsPos[1])
        }
    }
}


let id = 0
class GridRow {

    constructor(st) {
        augment(this, {
            id: ++id,
            dots: [],
        }, st)
        const grid = this.grid

        // TODO get ground y first and then derive Z from there?
        //      or just use the grid Z calculator?
        this.Z = lab.port.ground.Z(this.gridNZ)

        
        // TODO groundZ is not actually groundZ -> needs to be projected property to be one!
        //      it must be grid-space normal Z and there could be a way to translate one to another!
        // calculate the grid row z-depth
        const z = this.z = grid.nzToZ(this.gridNZ)
        // project grid-space z at the grid base to the quasi-normal viewport y
        const vpy = this.vpy = grid.projectGZtoVPY(z)

        const leftEdge  = grid.backTrace(grid.viewport.x1, vpy)
        const rightEdge = grid.backTrace(grid.viewport.x2, vpy)

        const startX = this.x1 = leftEdge[0] - (leftEdge[0] % grid.STEP) - grid.STEP
        const endX = this.x2 = rightEdge[0] - rightEdge[0] % grid.STEP + grid.STEP
        
        let prev
        for (let x = startX; x <= endX; x += grid.STEP) {
            const dot = new VaporDot({
                x:  x,
                y:  0,
                z:  z,
                grid: grid,
                prev: prev,
            })
            this.dots.push(dot)
            if (prev) prev.next = dot
            prev = dot
        }
    }

    adjustZ() {
        const vpy = this.vpy = this.grid.projectGZtoVPY(this.z)
        const wpos = [0, vpy]
        this.grid.vpToWorld(wpos)
        const groundNZ = this.groundNZ = lab.port.ground.nz(wpos[1])
        this.Z = lab.port.ground.Z(groundNZ)
    }

    locateDotAtX(x) {
        const dots = this.dots
        for (let i = dots.length - 1; i >= 0; i--) {
            const dot = dots[i] 
            if (dot.pos[0] === x) return dot
        }
    }

    connectDepth() {
        const next = this.next
        if (next) {
            this.dots.forEach(dot => {
                const tp = next.locateDotAtX(dot.pos[0])
                dot.top = tp
            })
        }

        const prev = this.prev
        if (prev) {
            this.dots.forEach(dot => {
                const bt = prev.locateDotAtX(dot.pos[0])
                dot.bottom = bt
            })
        }
    }

    evo(dt) {
        if (this.locked) return
        const dots = this.dots
        for (let i = dots.length - 1; i >= 0; i--) {
            dots[i].evo(dt)
        }
    }

    draw() {
        // const y  = lab.port.ground.nzToWY(this.groundZ)
        // lineWidth(1)
        // stroke('#eeee80')
        // line(lab.port.leftEdge(), y, lab.port.rightEdge(), y)
        this.dots.forEach(dot => dot.draw())
    }

}
