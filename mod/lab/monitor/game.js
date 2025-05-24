
const CHECK_FQ = 1

let lastCheck = 0
let gameOverCountdown = 0

function checkEndOfGameConditions() {
    let powerStations = 0
    lab.port._ls.forEach(e => {
        if (e instanceof dna.city.PowerStation && !e.dead) powerStations++
    })

    if (powerStations === 0) {
        gameOverCountdown = env.tune.gameOverTimeout
    }
}

function balanceElectricity() {
    const power = lab.port.select(e => e instanceof dna.city.PowerStation).reduce(
        (currentPower, powerStation) => currentPower + powerStation.getCurrentPower(),
        0
    )

    const powerCoverage = power / env.powerDemand

    // TODO determine how many buildings needs to be switch on/off
    //      then go over all of them randomly and turn on/off depending on the demand
}

function evo(dt) {
    if (!env.gameState === 'started') return

    if (gameOverCountdown > 0) {
        gameOverCountdown -= dt
        if (gameOverCountdown <= 0) {
            gameOverCountdown = -1
            trap('game/over')
        }
    }  else if (gameOverCountdown === 0) {
        if (env.time > lastCheck + CHECK_FQ) {
            checkEndOfGameConditions()
            balanceElectricity()
            lastCheck = env.time
        }
    }
}
