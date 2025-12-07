const TOTAL = 'total'

function reset() {
    extend(this, {
        waves:       [],
        launched:    {},
        intercepted: {},
        hit:         {},
        missed:      {},
        shots:       0,

        players:     [],
    })
}

function nextWave() {
    this.waves.push({
        launched:    {},
        intercepted: {},
        hit:         {},
        missed:      {},
        shots:       0,
    })
    this.wave = this.waves.length - 1
}

function launch(e) {
    if (!e || !e.stat) return

    const wave = this.waves[this.wave]
    wave.launched[e.stat] = wave.launched[e.stat]? wave.launched[e.stat] + 1 : 1
    wave.launched[TOTAL]  = wave.launched[TOTAL]?  wave.launched[TOTAL]  + 1 : 1

    this.launched[e.stat] = this.launched[e.stat]? this.launched[e.stat] + 1 : 1
    this.launched[TOTAL]  = this.launched[TOTAL]?  this.launched[TOTAL]  + 1 : 1
}

function shot(e) {
    const wave = this.waves[this.wave]

    wave.shots ++
    this.shots ++

    if (e.player) {
        if (!this.players[e.player]) this.players[e.player] = {}
        this.players[e.player].shots = this.players[e.player].shots?  this.players[e.player].shots + 1 : 1
    }
}

function __kill__(e, killer) {
    if (!e || !e.stat) return

    const wave = this.waves[this.wave]

    if (e instanceof dna.city.GuidedWeapon) {

        if (killer instanceof dna.city.Projectile) {
            // intercepted!
            if (e.score)  env.score  += e.score
            if (e.bounty) env.bounty += e.bounty

            wave.intercepted[e.stat] = wave.intercepted[e.stat]? wave.intercepted[e.stat] + 1 : 1
            wave.intercepted[TOTAL]  = wave.intercepted[TOTAL]?  wave.intercepted[TOTAL]  + 1 : 1

            this.intercepted[e.stat] = this.intercepted[e.stat]? this.intercepted[e.stat] + 1 : 1
            this.intercepted[TOTAL]  = this.intercepted[TOTAL]?  this.intercepted[TOTAL]  + 1 : 1

        } else if (killer instanceof dna.city.Target) {
            // hit the target!
            wave.hit[e.stat] = wave.hit[e.stat]? wave.hit[e.stat] + 1 : 1
            wave.hit[TOTAL]  = wave.hit[TOTAL]?  wave.hit[TOTAL]  + 1 : 1

            this.hit[e.stat] = this.hit[e.stat]? this.hit[e.stat] + 1 : 1
            this.hit[TOTAL]  = this.hit[TOTAL]?  this.hit[TOTAL]  + 1 : 1

        } else if (killer === 'ground') {
            // hit the ground!
            wave.missed[e.stat] = wave.missed[e.stat]? wave.missed[e.stat] + 1 : 1
            wave.missed[TOTAL]  = wave.missed[TOTAL]?  wave.missed[TOTAL]  + 1 : 1

            this.missed[e.stat] = this.missed[e.stat]? this.missed[e.stat] + 1 : 1
            this.missed[TOTAL]  = this.missed[TOTAL]?  this.missed[TOTAL]  + 1 : 1
        }

    }
}
this.kill = __kill__
