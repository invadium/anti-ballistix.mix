/*
 * BattleZone is a ground area potentially targeted
 * by drones and missiles.
 *
 * It is a strip of land where flaks and powerstations
 * are located.
 */

// translate battleZone-local z coordinate to screen y
function sy(lz) {
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return y1 + lz * ySpan
}

// translate battleZone-local z coordinate to port y
function py(lz) {
    return lab.port.ly(sy(lz))
}

// translate screen y coordinate to the battleZone z
function lz(sy) {
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return (sy - y1)/ySpan
}

function groundRelativeHeight() {
    return ((env.tune.battleZone.end - env.tune.battleZone.start) * (1 - env.tune.horizonLine))
}

// translate to Z-order from the battlezone-local relative z
function Z(lrz) {
    return 100 + lrz * 100
}
