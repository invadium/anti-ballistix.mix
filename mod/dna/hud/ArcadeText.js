let id = 0

function rightPad(line, len) {
    for (let i = line.length; i < len; i++) line = line + ' '
    return line
}

/*
 * TODO text fade out
 * TODO print out delay
 * TODO handle double-print-out cases (reprint from scratch?)
 */
class ArcadeText {

    constructor(st) {
        extend(this, {
            name:         'arcadeText' + (++id),
            text:         '',
            lines:        [],
            progression:  0,
            startedTime:  0,
            printedTime:  0,

            color:        '#dede90',
            font:         '24px pixel-operator',
            align:        'center',
            baseline:     'middle',
            step:          28,
            x:             0,
            y:             0,
            rx:           .5,
            ry:           .5,
            shadowDx:      5,
            shadowDy:      5,

            typeFQ:        12,
            keep:          5,
        }, st)
    }

    printOut(txt) {
        this.text = txt
        if (txt) {
            this.lines = txt.split('\n')
            this.length = this.lines.reduce((acc, line) => acc + line.length, 0)
        } else {
            this.lines = []
            this.length = 0
        }
        this.progression = 0
        this.startedTime = env.time
        this.printedTime = 0
    }

    evo(dt) {
        this.progression = floor((env.time - this.startedTime) * this.typeFQ)
        if (this.printedTime === 0 && this.progression >= this.length) {
            this.printedTime = env.time
        }
    }

    draw() {
        if (this.lines.length === 0) return
        if (this.printedTime !== 0 && env.time - this.printedTime > this.keep) return

        save()

        ctx.textAlign    = this.align
        ctx.textBaseline = this.baseline
        font(this.font)

        let tx = isNumber(this.rx)? rx(this.rx) : this.x
        let ty = isNumber(this.ry)? ry(this.ry) : this.y
        const stepY = this.step

        let charCount = 0
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i]
            let hShift = 0

            if (charCount < this.progression) {
                let vline = line
                
                if (this.progression < charCount + line.length) {
                    vline = line.substring(0, this.progression - charCount)
                    switch(this.align) {
                        case 'center': hShift = -.5 * (textWidth(line) - textWidth(vline)); break;
                        case 'right':  hShift = -textWidth(line) - textWidth(vline); break;
                    }
                }

                if (this.shadowColor) {
                    fill(this.shadowColor)
                    text(vline, tx+this.shadowDx+hShift, ty+this.shadowDy)
                }
                fill(this.color)
                text(vline, tx+hShift, ty)
            }

            charCount += line.length
            ty += stepY
        }

        restore()
    }
}
