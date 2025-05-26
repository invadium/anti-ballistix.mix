
const CHECK_FQ = 1

const POWER_GAP = .1

let lastCheck = 0
let gameOverCountdown = 0

function checkEndOfGameConditions() {
    const buildings = lab.backdrop.city._ls,
          poweredBuildings  = buildings.filter(b => b.powerState)

    if (poweredBuildings.length === 0) {
        gameOverCountdown = env.tune.gameOverTimeout
    }
}

function balanceElectricity() {
    const power = lab.port.select(e => e instanceof dna.city.PowerStation).reduce(
        (currentPower, powerStation) => currentPower + powerStation.getCurrentPower(),
        0
    )

    const powerProduced = power / env.powerDemand // normalized value 0..1

    const buildings = lab.backdrop.city._ls,
          poweredBuildings  = buildings.filter(b => b.powerState),
          blackoutBuildings = buildings.filter(b => !b.powerState)

    const powerConsumed = poweredBuildings.length / buildings.length

    if (powerProduced < powerConsumed) {
        // need to cut off electricity to some buildings
        math.rnde(poweredBuildings).cutOff()
    } else if (powerProduced > powerConsumed + POWER_GAP) {
        // need to power on some buildings
        math.rnde(blackoutBuildings).powerOn()
    }
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
