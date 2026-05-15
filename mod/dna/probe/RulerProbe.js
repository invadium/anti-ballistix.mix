// TODO migrate to the core Collider.JAM probes

let id = 0
class RulerProbe {

    constructor(st) {
        augment(this, {
            name:   'rulerProbe' + (++id),
            x:      0,
            y:      0,
            width:  0,
            height: 0,

            horizontalAlignment: 'left',
            verticalAlignment:   'bottom',

            lineWidth: 2,
            step:      50,
            markSize:  10,
            flipY:     false,
            color:    '#808080',
        }, st)
    }

    drawHorizontalRuler() {
        const { x, y, width, step, markSize, color } = this

        stroke(color)
        lineWidth(this.lineWidth)
        line(x, y, x + width, y)

        let bx = x
        while(bx <= x + width) {
            save()
            translate(bx, y)

            if (this.flipY) scale(1, -1) // flip Y coordinate for text rendering

            if (this.verticalAlignment === 'bottom') {
                stroke(color)
                line(0, 0, 0, -markSize)

                fill(color)
                baseTop()
                alignCenter()
                font(env.style.font.debug.head)
                text(`${bx}`, 0, markSize)
            } else {
                stroke(color)
                line(0, 0, 0, markSize)

                fill(color)
                baseBottom()
                alignCenter()
                font(env.style.font.debug.head)
                text(`${bx}`, 0, -markSize)
            }

            restore()
            bx += step
        }
    }

    drawVerticalRuler() {
        const { x, y, height, step, markSize, color } = this

        stroke(color)
        lineWidth(this.lineWidth)
        line(x, y, x, y + height)

        let by = y
        while(by <= y + height) {
            save()
            translate(x, by)

            if (this.flipY) scale(1, -1) // flip Y coordinate for text rendering

            if (this.horizontalAlignment === 'left') {
                stroke(color)
                line(0, 0, markSize, 0)

                fill(color)
                baseMiddle()
                alignRight()
                font(env.style.font.debug.head) // TODO get from style by a string locator || default collider font and style
                text(`${by}`, -markSize, 0)
            } else {
                stroke(color)
                line(0, 0, -markSize, 0)

                fill(color)
                baseMiddle()
                alignLeft()
                font(env.style.font.debug.head) // TODO get from style by a string locator || default collider font and style
                text(`${by}`, markSize, 0)
            }

            restore()
            by += step
        }
    }

    draw() {
        const { __, width, height } = this

        if (width) this.drawHorizontalRuler(width)
        if (height) this.drawVerticalRuler(height)
    }
}
