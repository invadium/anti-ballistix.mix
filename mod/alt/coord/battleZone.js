/*
 * BattleZone is a ground area potentially targeted
 * by drones and missiles.
 *
 * It is a strip of land where flaks and powerstations
 * are located.
 *
 * TODO remove if not used
 */


// translate battleZone-local z coordinate to screen y
function sy(lz) {
    throw new Error('deprecated!')
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return y1 + lz * ySpan
}

// translate battleZone-local z coordinate to port y
function wy(lz) {
    throw new Error('deprecated!')
    return lab.port.ly(sy(lz))
}

// translate screen y coordinate to the battleZone z
function lz(sy) {
    throw new Error('deprecated!')
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return (sy - y1)/ySpan
}

function groundRelativeHeight() {
    throw new Error('deprecated!')
    return ((env.tune.battleZone.end - env.tune.battleZone.start) * (1 - env.tune.horizonLine))
}

// translate to Z-order from the battlezone-local relative z
function Z(lrz) {
    throw new Error('deprecated!')
    return 100 + lrz * 100
}
