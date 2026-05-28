class VaporDot {

    constructor(st) {
        extend(this, {
            pos: [0, 0, 0],
            vPos: [0, 0],
            wPos: [0, 0],

            pin: null,
        })
        this.grid = st.grid
        this.row  = st.row
        if (st && isNum(st.x)) {
            this.pos[0] = st.x
            this.pos[1] = st.y
            this.pos[2] = st.z
        }
        this.at = [...this.pos]
    }

    attach(node) {
        this.pin = node
    }

    detach() {
        this.pin = null
    }

    syncWith(dot) {
        this.follower = dot
        dot.lead = this
    }

    pushOut(node, n) {
        if (!n || !this.top) {
            this.attach(node)
            return this
        } else {
            return this.top.pushOut(node, n - 1)
        }
    }

    evo(dt) {
        if (this.lead) return
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

        /*
        // random push up
        if (rnd() < FQ * dt) {
            this.push = JUMP
        }
        */

        if (this.follower) {
            this.follower.pos[1] = this.pos[1]
        }
    }

    draw() {
        const grid = this.grid
        const pos = this.pos
        if (pos[3] < 1) return

        /*
        if (this.pin) {
            const R = 4 * grid.descale
            fill('#CE40EE')
            block(this.wPos[0], this.wPos[1], R, R)
        }
        */

        if (this.next) {
            lineWidth(grid.descale)
            stroke(env.style.color.grid)
            line(this.wPos[0], this.wPos[1], this.next.wPos[0], this.next.wPos[1])
        }
        /*
        if (this.top) {
            lineWidth(grid.descale)
            stroke(env.style.color.grid)
            line(screenPos[0], screenPos[1], tsPos[0], tsPos[1])
            line(this.wPos[0], this.wPos[1], this.top.wPos[0], this.top.wPos[1])
        }
        */
        if (this.bottom) {
            lineWidth(grid.descale)
            stroke(env.style.color.grid)
            line(this.wPos[0], this.wPos[1], this.bottom.wPos[0], this.bottom.wPos[1])
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
        let dotId = 0
        for (let x = startX; x <= endX; x += grid.STEP) {
            const dot = new VaporDot({
                id: ++dotId,
                x:  x,
                y:  0,
                z:  z,
                grid: grid,
                row:  this,
                prev: prev,
            })
            this.dots.push(dot)
            grid.registerDot(dot)
            if (prev) prev.next = dot
            prev = dot
        }
    }

    adjustZ() {
        const vpy = this.vpy = this.grid.projectGZtoVPY(this.z)
        const wpos = [0, vpy]
        this.grid.vpToWorld(wpos, wpos)
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

    splitSearch(predicate, src) {
        const dots = this.dots

        function split(imid, istart, iend, depth) {
            const dot = dots[imid]
            if (dot && predicate(dot)) {
                dot._depth = depth
                return dot
            }

            let left, right
            if (imid !== istart) {
                left = split(istart + floor(.5 * (imid - istart)), istart, imid - 1, depth + 1)
            }
            if (imid !== iend) {
                right = split(imid + ceil(.5 * (iend - imid)), imid + 1, iend, depth + 1)
            }
            if (left && right) {
                if (src) {
                    if (src.rndf() < .5) return left
                    else return right
                } else {
                    if (left._depth < right._depth) return left
                    else return right
                }
            }
            if (left)  return left
            if (right) return right
        }

        const imid = floor(.5 * (dots.length - 1))
        return split(imid, 0, dots.length - 1, 1)
    }

    locateRandomDot(predicate, src) {
        const dots = this.dots

        function tryNext(n) {
            const i = src.rndi( dots.length )
            const dot = dots[i]
            if (dot && predicate(dot)) return dot

            if (n > 0) return tryNext(n - 1)
        }

        return tryNext(dots.length)
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
