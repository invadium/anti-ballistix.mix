let id = 0
class GridRow {

    constructor(st) {
        augment(this, {
            id: ++id,
        }, st)
        // why don't we ask battlezone about that level?
        this.Z  = coord.battleZone.Z(this.groundZ)
    }

    draw() {
        const h  = ctx.height,
              hh = .5 * h,
              y  = coord.ground.py(this.groundZ)

        lineWidth(4)
        stroke('#ffff00')

        line(lab.port.leftEdge(), y, lab.port.rightEdge(), y)
    }

}
