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
            ROWS:  11,
            STEP:  500,
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
        const ROWS = this.ROWS,
              gzStep = 1/(ROWS - 1)

        let groundZ = 0
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

    projectY(z) {
        return ((-this.cameraHeight) * this.focusDistance) / z
    }

    // translate a quasi-normal viewport point to the world space
    vpToWorld(v) {
        const GH = lab.port.ground.height()
        const DY = this.lastRow.py
        const VPH = .5 * this.viewport.height + DY
        v[1] = (v[1] - DY) * (GH/VPH)
        return v
    }

    // backgracke a quasi-normal viewport point back to a ground-point in the grid space
    backTrace(vpx, vpy) {
        const y = -this.cameraHeight
        const z = (y - this.cameraHeight) * this.focusDistance / vpy
        const x = (vpx * z) / this.focusDistance

        return [ x, y, z ]
    }

}
