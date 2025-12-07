/*
 * The ghost source of drones and missiles
 */

const IDLE      = 0,
      ARMING_UP = 1,
      ONGOING   = 2,
      CONCLUDED = 3,
      OVER      = 4

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

    lab.overlay.messageBar.typeOut({
        text:  `Wave ${env.wave}`,
        keep:  1.5,
        delay: 0,

        onFinish: function() {
            armsUp()
        }
    })

    state = {
        started:  env.time,
        current:  IDLE,
        lastMark: env.time,

        // spawn stat
        spawned: {
            drones:            0,
            glideBombs:        0,
            ballisticMissiles: 0,
            cruiseMissiles:    0,
        }
    }

    env.stat.nextWave()
}

function armsUp() {
    state.current = ARMING_UP
    state.lastMark = env.time
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

    state.spawned.ballisticMissiles ++
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

    state.spawned.drones ++
    env.stat.launch(drone)
}

function isCompleted() {
    if (profile.time && (env.time - state.started) > profile.time) return true

    if (profile.limits) {
        const limits = Object.keys(profile.limits)

        let reached = 0
        for (let i = 0; i < limits.length; i++) {
            const name  = limits[i]
            const limit = profile.limit[name]
            if (state.spawned[name] >= limit) reached ++
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

function completeWave() {
    nextWave()
}

function evoSpawn(dt) {
        if (rnd() < profile.fq.ballisticMissiles * dt) spawnBallistic()
        if (rnd() < profile.fq.drones * dt) spawnDrone()
        // TODO ... the same for cruise missiles and glide bobms
}

function evo(dt) {
    if (!profile) return


    switch(state.current) {
        case IDLE:
            break
        case ARMING_UP:
            if (!profile.delay || (env.time - state.lastMark) > profile.delay) {
                state.current  = ONGOING
                state.lastMark = env.time
            }
            break
        case ONGOING:
            evoSpawn(dt)

            if (isCompleted()) {
                state.current = CONCLUDED
                state.lastMark = env.time
            }
            break
        case CONCLUDED:
            countEnemyTargets()
            if (enemyTargets === 0) {
                state.current = OVER

                const intercepted = env.stat.waves[env.iwave].intercepted.total || 0
                const launched = env.stat.waves[env.iwave].launched.total || 0
                const rate     = launched? round((intercepted/launched) * 100) : 100

                lab.overlay.messageBar.typeOut({
                    text:   `Wave Completed!\n\nIntercepted: ${intercepted}/${launched} (${rate}%)`,
                    keep:    5,
                    delay:   4,
                    subtext: true,

                    onFinish: function() {
                        nextWave()
                    }
                })

            }
            break

        case OVER:
            break

            if ((env.time - state.started) < profile.time)

            if (isCompleted() && enemyTargets === 0) completeWave()

            break
    }
}

function getState() {
    return state
}
