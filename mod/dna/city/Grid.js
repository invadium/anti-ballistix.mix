class Grid {

    constructor(st) {
        augment(this, {
            name: 'grid',
            ROWS:  11,
            rows:  [],
        }, st)
    }

    init() {
        const ROWS = this.ROWS,
              gzStep = 1/(ROWS - 1)

        let groundZ = 0
        let lastRow
        for (let i = 0; i < ROWS; i++) {
            const row = lab.port.spawn( dna.city.GridRow, {
                Z:  10,
                groundZ,
                prev: lastRow,
            })
            this.rows.push(row)
            if (lastRow) lastRow.next = row

            lastRow = row
            groundZ += gzStep
        }
    }

}
