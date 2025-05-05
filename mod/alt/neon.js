// TODO make into a context-like API with a state for color etc
//      make it chainable as well?

function _line_ (x1, y1, x2, y2, lcolor, ncolor) {
    ctx.lineCap = 'round'

    let glow = .05
    let width = 12
    let steps = 5

    for (let i = 0; i < steps; i++) {
        alpha(glow);
        lineWidth(width);
        stroke(ncolor);
        line(x1, y1, x2, y2)

        glow += .02
        width -= 1.5
    }

    lineWidth(3)
    stroke(lcolor)
    alpha(1)
    stroke(lcolor)
    line(x1, y1, x2, y2)

    return this
}

function _circle_(x, y, r, lcolor, ncolor) {
    let glow  = .05
    let width = 12
    let steps = 5

    for (let i = 0; i < steps; i++) {
        alpha(glow);
        lineWidth(width);
        stroke(ncolor);
        circle(x, y, r)

        glow += .02
        width -= 1.5
    }

    lineWidth(3)
    stroke(lcolor)
    alpha(1)
    stroke(lcolor)
    circle(x, y, r)

    return this
}

function _rect_(x, y, w, h, lcolor, ncolor) {
    _line_(x,     y,     x,     y + h, lcolor, ncolor)
    _line_(x,     y + h, x + w, y + h, lcolor, ncolor)
    _line_(x + w, y + h, x + w, y,     lcolor, ncolor)
    _line_(x + w, y,     x,     y,     lcolor, ncolor)
    return this
}

const neon = {
    line:   _line_,
    circle: _circle_,
    rect:   _rect_,
}

