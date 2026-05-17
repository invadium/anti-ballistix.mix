/*
 * Vaporwave grid
 *
 * Contains grid rows and the methods to project points
 * to the grid and off the grid.
 */
class Grid {

    constructor(st) {
        augment(this, {
            Z:     9,
            name: 'grid',
            ROWS:  13,
            STEP:  250,
            rows:  [],

            focusDistance:  100,
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
        const ROWS = this.ROWS
        let groundZ = this.startZ = .1
        const gzStep = (1-groundZ)/(ROWS)

        this.lastZ = this.startZ + gzStep * (ROWS - 1)
        let lastRow
        for (let i = 0; i < ROWS; i++) {
            const row = lab.port.spawn( dna.city.grid.GridRow, {
                Z:    0,
                groundZ,
                name: 'gridRow' + (i+1),
                grid: this,
                prev: lastRow,
            })
            this.rows.push(row)
            if (lastRow) lastRow.next = row

            lastRow = row
            groundZ += gzStep
        }

        this.rows.forEach(row => row.connectDepth())
        this.lastRow = lastRow
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
        const z = (y - this.cameraHeight) * this.focusDistance / vpy
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
        return (nz * nz + .01) * env.playfield.depth
        //return (nz + .01) * env.playfield.depth
    }
}
