// get the arcade world space y-coordinate from a relative percentage value, where 0 is the bottom of the playfield and 100 is the top
function cry(yP) {
    return lab.port.ly((0.01 * yP) * lab.h)
}
