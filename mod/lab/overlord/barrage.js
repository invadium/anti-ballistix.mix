/*
 * The ghost source of drones and missiles
 */

// TODO make configurable by Wave #N data

const BFQ = .25
const DFQ = .07

function onNewScenario() {
    log('starting drone/missile barrage')
}

function spawnBallistic() {
    const viewport = lab.port.viewport()

    const m = lab.port.spawn(dna.city.BallisticMissile, {
        x: crx(10 + RND(80)),
        y: viewport.y,
        dir: .4 * PI + .2 * PI * rnd(),
    })

    // log(`new ballistic missile @${m.x}:${m.y}`)
}

function spawnDrone() {
    const viewport = lab.port.viewport()

    const m = lab.port.spawn(dna.city.Drone, {
        x: -crx(100),
        y: (.55 + .2 * rnd()) * viewport.y,
        //dir: .4 * PI + .2 * PI * rnd(),
        dir: 0,
    })
}

function evo(dt) {
    if (rnd() < BFQ * dt) spawnBallistic()
    if (rnd() < DFQ * dt) spawnDrone()
}
