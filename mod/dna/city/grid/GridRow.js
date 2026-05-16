class Cam {

    constructor() {
        extend(this, {
            focusDistance: 100,
            playerHeight:  1000,
        })
    }

    project(pos) {
        return [
            (pos[0] * this.focusDistance) / pos[2],
            ((pos[1] - this.playerHeight) * this.focusDistance) / pos[2]
        ]
    }

    projectY(z) {
        return ((-this.playerHeight) * this.focusDistance) / z
    }

    backTrace(px, py) {
        const y = -this.playerHeight
        const z = (y - this.playerHeight) * this.focusDistance / py
        const x = (px * z) / this.focusDistance

        return [ x, y, z ]
    }
}
const cam = new Cam()

class VaporDot {

    constructor(st) {
        extend(this, {
            pos: [0, 0, 0],
        })
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
        const DY = 100
        if (this.pos[1] > this.at[1]) {
            this.pos[1] -= DY * dt
            if (this.pos[1] < this.at[1]) {
                this.pos[1] = this.at[1]
            }
        }

        if (rnd() < FQ * dt) {
            this.pos[1] += JUMP
        }
    }

    draw() {
        const pos = this.pos
        if (pos[3] < 1) return

        const screenPos = cam.project(pos)

        // const sx = (x * FD) / z
        // const sy = ((y - PH) * FD) / z

        fill('#ffff00')
        rect(screenPos[0], screenPos[1], 5, 5)

        if (this.next) {
            const nsPos = cam.project(this.next.pos)
            lineWidth(1)
            stroke('#00ffff')
            line(screenPos[0], screenPos[1], nsPos[0], nsPos[1])
        }
        if (this.top) {
            const tsPos = cam.project(this.top.pos)
            lineWidth(1)
            stroke('#00ffff')
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

        // TODO backgrace normal-z => screen-projected-Z => real z
        const z = (this.groundZ * this.groundZ + .1) * 1000
        const py = cam.projectY(z)
        const leftEdge = cam.backTrace(-1000, py)
        const rightEdge = cam.backTrace(1000, py)

        const startX = leftEdge[0] - (leftEdge[0] % 500)
        const endX = rightEdge[0] - rightEdge[0] % 500 + 500
        
        let prev
        for (let x = startX; x < endX; x += 500) {
            const dot = new VaporDot({
                x:  x,
                y:  0,
                z:  z,
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
        const h  = ctx.height,
              hh = .5 * h,
              y  = lab.port.ground.py(this.groundZ)

        lineWidth(1)
        stroke('#eeee80')

        line(lab.port.leftEdge(), y, lab.port.rightEdge(), y)

        this.dots.forEach(dot => dot.draw())
    }

}
