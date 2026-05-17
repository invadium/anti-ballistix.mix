/*
 * Vaporwave grid
 *
 * Contains grid rows and the methods to project points
 * to the grid and off the grid.
 */
class Grid {

    constructor(st) {
        augment(this, {
            Z:             9,
            name:         'grid',
            ROWS:          15,
            STEP:          250,
            DEPTH_SHIFT:   72, 
            rows:          [],
            focusDistance: 100,

            // quasi-normalized viewport
            viewport: {
                width:  env.playfield.width,
                aspect: 2,
            }
        }, st)
        this.viewport.height = this.viewport.width / this.viewport.aspect
        this.viewport.x1 = -.5 * this.viewport.width
        this.viewport.x2 =  .5 * this.viewport.width
        this.cameraHeight = .5 * this.viewport.height
        this.viewport.y1 = -.5 * this.viewport.height
        this.viewport.y2 =  .5 * this.viewport.height
    }

    init() {
        // start normalized z from .1, so the ultra-small values
        // won't get squashed by the quadratic transformation to the grid z
        let gridNZ = this.startZ = .1
        // step normalized z from .1 to 1
        const gnzStep = (1 - this.startZ)/(this.ROWS - 1)

        let lastRow
        for (let i = 0; i < this.ROWS; i++) {
            const row = lab.port.spawn( dna.city.grid.GridRow, {
                Z:    0,
                gridNZ,
                name: 'gridRow' + (i+1),
                grid: this,
                prev: lastRow,
            })
            this.rows.push(row)
            if (lastRow) lastRow.next = row
            else row.locked = true

            lastRow = row
            gridNZ += gnzStep
        }
        this.lastRow = lastRow
        lastRow.locked = true

        this.rows.forEach(row => row.connectDepth())

        defer(() => {
            this.rows.forEach(row => row.adjustZ())
            lab.port.orderZ()
        }, .1)
    }

    project(pos) {
        return [
            (pos[0] * this.focusDistance) / pos[2],
            ((pos[1] - this.cameraHeight) * this.focusDistance) / pos[2]
        ]
    }

    // project the grid-space z-value at the base to the quasi-normal viewport y
    projectGZtoVPY(gz) {
        return ((-this.cameraHeight) * this.focusDistance) / gz
    }

    // translate a quasi-normal viewport vector to the world space
    vpToWorld(v) {
        const GH = lab.port.ground.height()
        const topVPY = this.projectGZtoVPY(this.lastRow.z)
        const VPH = .5 * this.viewport.height - topVPY
        // adjust viewport-space Y to start at the horizon line
        // and scale to the actual world-space ground size
        v[1] = (v[1] - topVPY) * (GH/VPH)
        return this
    }

    // translate a world space vector to the quasi-normal viewport vector
    worldToViewport(v) {
        const GH = lab.port.ground.height()
        const topVPY = this.projectGZtoVPY(this.lastRow.z)
        const VPH = .5 * this.viewport.height - topVPY
        // adjust viewport-space Y to start at the horizon line
        // and scale to the actual world-space ground size
        v[1] = v[1] * (VPH/GH) + topVPY
        return this
    }

    wyToVPY(wy) {
        const GH = lab.port.ground.height()
        const topVPY = this.projectGZtoVPY(this.lastRow.z)
        const VPH = .5 * this.viewport.height - topVPY
        return wy * (VPH/GH) + topVPY
    }

    // backgracke a quasi-normal viewport point back to a ground-point in the grid space
    backTrace(vpx, vpy) {
        const y = -this.cameraHeight
        const z = y * this.focusDistance / vpy
        const x = (vpx * z) / this.focusDistance

        return [ x, y, z ]
    }

    backTraceV(v) {
        const y = -this.cameraHeight
        const z = (y - this.cameraHeight) * this.focusDistance / v[1]
        const x = (v[1] * z) / this.focusDistance

        return [ x, y, z ]
    }

    worldToGridBase(wx, wy) {
        const v = [ wx, wy ]
        this.worldToViewport(v)
        return this.backTraceV(v)
    }

    nzToZ(nz) {
        return (nz*nz) * env.playfield.depth + this.DEPTH_SHIFT
    }

    zToNZ(z) {
        return sqrt((z - this.DEPTH_SHIFT) / env.playfield.depth)
    }
}
