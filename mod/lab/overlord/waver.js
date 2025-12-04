/*
 * The ghost source of drones and missiles
 */

// TODO make configurable by Wave #N data

// const BFQ = .25
// const DFQ = .07

let state, profile, enemyTargets = 0

function onNewScenario() {
    nextWave()
}

function raidOver() {
    if (env.gameResult === 'undecided') {
        env.gameResult = 'success'
    }
    trap('game/over')
}

function nextWave() {
    profile = env.scenario.nextWave()
    if (!profile) raidOver()

    state = {
        started:           env.time,

        // spawn stat
        spawn: {
            drones:            0,
            glideBombs:        0,
            ballisticMissiles: 0,
            cruiseMissiles:    0,
        }
    }

    env.stat.wave()
}

function spawnBallistic() {
    // TODO check the ballistics limit
    const viewport = lab.port.viewport()

    const missile = lab.port.spawn(dna.city.BallisticMissile, {
        x: crx(10 + RND(80)),
        y: viewport.y,
        dir: .4 * PI + .2 * PI * rnd(),
    })

    if (env.showCoordinates) {
        missile.install( new dna.city.probe.CoordinatesProbe({
            x:   -20,
            y:    20,
            dir: -HALF_PI,
        }) )
    }

    state.spawn.ballisticMissiles ++
    env.stat.launch(missile)
}

function spawnDrone() {
    // TODO check the drones limit
    const viewport = lab.port.viewport()

    const drone = lab.port.spawn(dna.city.Drone, {
        x: -crx(100),
        y: (.55 + .2 * rnd()) * viewport.y,
        //dir: .4 * PI + .2 * PI * rnd(),
        dir: 0,
    })

    if (env.showCoordinates) {
        drone.install( new dna.city.probe.CoordinatesProbe({
            x:   -40,
            y:    20,
            dir: -HALF_PI,
        }) )
    }

    state.spawn.drones ++
    env.stat.launch(drone)
}

function isCompleted() {
    if (profile.time && (env.time - state.started) > profile.time) return true

    if (profile.spawn) {
        const limits = Object.keys(profile.spawn)

        let reached = 0
        for (let i = 0; i < limits.length; i++) {
            const name  = limits[i]
            const limit = profile.spawn[name]
            if (state.spawn[name] >= limit) reached ++
        }

        if (reached >= limits.length) return true
    }

    return false
}

function countEnemyTargets() {
    enemyTargets = lab.port._ls.reduce((acc, e) => e.team === 2? acc + 1 : acc, 0)
}

function getEnemyTargets() {
    return enemyTargets
}

function tryToLaunchNextWave() {
    if (enemyTargets !== 0) return

    nextWave()
}

function evoSpawn(dt) {
        if (rnd() < profile.fq.ballisticMissiles * dt) spawnBallistic()
        if (rnd() < profile.fq.drones * dt) spawnDrone()
        // TODO ... the same for cruise missiles and glide bobms
}

function evo(dt) {
    if (!profile) return
    if (profile.delay && (env.time - state.started) < profile.delay) return

    if ((env.time - state.started) < profile.time) evoSpawn(dt)

    countEnemyTargets()
    if (isCompleted()) tryToLaunchNextWave()
}
