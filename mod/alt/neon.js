// TODO make into a context-like API with a state for color etc
//      make it chainable as well?

function _line_ (x1, y1, x2, y2, color) {
    ctx.lineCap = 'round'

    let glow = .05
    let width = 12
    let steps = 5

    for (let i = 0; i < steps; i++) {
        alpha(glow);
        lineWidth(width);
        stroke(color);
        line(x1, y1, x2, y2)

        glow += .02
        width -= 1.5
    }

    lineWidth(3)
    stroke(color)
    alpha(1)
    stroke(color)
    line(x1, y1, x2, y2)

    return this
}

function _circle_(x, y, r, color) {
    let glow  = .05
    let width = 12
    let steps = 5

    for (let i = 0; i < steps; i++) {
        alpha(glow);
        lineWidth(width);
        stroke(color);
        circle(x, y, r)

        glow += .02
        width -= 1.5
    }

    lineWidth(3)
    stroke(color)
    alpha(1)
    stroke(color)
    circle(x, y, r)

    return this
}

function _rect_(x, y, w, h, color) {
    _line_(x,     y,     x,     y + h, color)
    _line_(x,     y + h, x + w, y + h, color)
    _line_(x + w, y + h, x + w, y,     color)
    _line_(x + w, y,     x,     y,     color)
    return this
}

const neon = {
    line:   _line_,
    circle: _circle_,
    rect:   _rect_,
}

