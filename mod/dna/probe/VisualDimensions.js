class VisualDimensions {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'visualDimensions',
            x:     0,
            y:     0,
        }, st)
    }

    draw() {
        const __ = this.__

        let vis
        let lead
        if (__.visual) {
            vis  = __.visual
            lead = vis
        } else {
            vis  = __
            lead = this
        }

        // assume we are at the body's origin
        save()
        translate(lead.x, lead.y)

        lineWidth(2)
        stroke('#ff8040')
        if (vis._circular) {
            circle(0, 0, __.r)
        } else if (vis._rectangular) {
            if (vis._centered) {
                block(0, 0, vis.w, vis.h)
            } else {
                rect(0, 0, vis.w, vis.h)
            }
        }

        restore()
    }

}
