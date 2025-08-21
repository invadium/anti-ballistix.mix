// get arcade space y-coordinate from a relative percentage value, where 0 is the bottom of the playfield and 100 is the top
function cry(yP) {
    return -0.01 * yP * env.playfield.height
}
