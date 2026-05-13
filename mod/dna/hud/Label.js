const df = {
    name:         'label',
    text:         'default',
    color:        '#ffffff',
    font:         '24px pixel-operator',
    align:        'center',
    baseline:     'middle',
    x:             0,
    y:             0,
    rot:           0,
    shadowDx:      5,
    shadowDy:      5,
}

class Label {

    constructor(st) {
        extend(this, df, st)
    }

    draw() {
        if (this.adjust) this.adjust()

        const tx = isNumber(this.rx)? rx(this.rx) : this.x
        const ty = isNumber(this.ry)? ry(this.ry) : this.y
        const txt = isFun(this.text)? this.text() : this.text

        save()
        translate(tx, ty)
        if (this.rot) rotate(this.rot)

        font(this.font)
        ctx.textAlign = this.align
        ctx.textBaseline = this.baseline

        if (this.shadowColor) {
            fill(this.shadowColor)
            text(txt, this.shadowDx, this.shadowDy)
        }
        fill(this.color)
        text(txt, 0, 0)

        restore()
    }
}
