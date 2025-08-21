// get arcade space x-coordinate from a relative percentage value, where 0 is the left edge and 100 is the right edge
function crx(xP) {
    return 0.01 * xP * env.playfield.width - .5 * env.playfield.width
}
