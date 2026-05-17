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
        if (this.top) {
            const tsPos = grid.project(this.top.pos)
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
        // why don't we ask battlezone about that level?
        this.Z = lab.port.ground.Z(this.groundZ)

        const grid = this.grid
        // TODO backgrace normal-z => screen-projected-Z => real z
        const z = (this.groundZ * this.groundZ + .1) * 1000
        const py = this.py = grid.projectY(z)
        const leftEdge  = grid.backTrace(grid.viewport.x1, py)
        const rightEdge = grid.backTrace(grid.viewport.x2, py)

        const startX = leftEdge[0] - (leftEdge[0] % grid.STEP)
        const endX = rightEdge[0] - rightEdge[0] % grid.STEP + grid.STEP
        
        let prev
        for (let x = startX; x < endX; x += 500) {
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

    locateDotAtX(x) {
        const dots = this.dots
        for (let i = dots.length - 1; i >= 0; i--) {
            const dot = dots[i] 
            if (dot.pos[0] === x) return dot
        }
    }

    connectDepth() {
        const next = this.next
        if (!next) return

        this.dots.forEach(dot => {
            const tp = next.locateDotAtX(dot.pos[0])
            dot.top = tp
        })
    }

    evo(dt) {
        const dots = this.dots
        for (let i = dots.length - 1; i >= 0; i--) {
            dots[i].evo(dt)
        }
    }

    draw() {
        // const y  = lab.port.ground.py(this.groundZ)
        // lineWidth(1)
        // stroke('#eeee80')
        // line(lab.port.leftEdge(), y, lab.port.rightEdge(), y)
        this.dots.forEach(dot => dot.draw())
    }

}
