/*
 * BattleZone is a ground area potentially targeted
 * by drones and missiles.
 *
 * It is a strip of land where flaks and powerstations
 * are located.
 */

// project battleZone-local z coordinate to screen y
function sy(lz) {
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return y1 + lz * ySpan
}

// project battleZone-local z coordinate to port y
function py(lz) {
    return lab.port.ly(sy(lz))
}

// project screen y coordinate to the battleZone z
function lz(sy) {
    const y1 = ry(env.tune.battleZone.start),
          y2 = ry(env.tune.battleZone.end),
          ySpan = (y2 - y1)
    return (sy - y1)/ySpan
}

// get Z-order from battlezone-local z
function Z(lz) {
    return 100 + 100 * lz
}
