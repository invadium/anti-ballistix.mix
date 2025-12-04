const TOTAL = 'total'

function reset() {
    extend(this, {
        waves:       0,
        launched:    {},
        intercepted: {},
        hit:         {},
        missed:      {},
        shots:       0,
        players:     [],
    })
}

function wave() {
    this.waves ++
}

function launch(e) {
    if (!e || !e.stat) return

    this.launched[e.stat] = this.launched[e.stat]? this.launched[e.stat] + 1 : 1
}

function shot(e) {
    this.shots ++

    if (e.player) {
        if (!this.players[e.player]) this.players[e.player] = {}
        this.players[e.player].shots = this.players[e.player].shots?  this.players[e.player].shots + 1 : 1
    }
}

function __kill__(e, killer) {
    if (!e || !e.stat) return

    if (e instanceof dna.city.GuidedWeapon) {

        if (killer instanceof dna.city.Projectile) {
            // intercepted!
            if (e.score)  env.score  += e.score
            if (e.bounty) env.bounty += e.bounty

            this.intercepted[e.stat] = this.intercepted[e.stat]? this.intercepted[e.stat] + 1 : 1
            this.intercepted[TOTAL]  = this.intercepted[TOTAL]?  this.intercepted[TOTAL]  + 1 : 1

        } else if (killer instanceof dna.city.Target) {
            // hit the target!
            this.hit[e.stat] = this.hit[e.stat]? this.hit[e.stat] + 1 : 1
            this.hit[TOTAL]  = this.hit[TOTAL]?  this.hit[TOTAL]  + 1 : 1

        } else {
            // hit the ground!
            this.missed[e.stat] = this.missed[e.stat]? this.missed[e.stat] + 1 : 1
            this.missed[TOTAL]  = this.missed[TOTAL]?  this.missed[TOTAL]  + 1 : 1
        }

    }
}
this.kill = __kill__
