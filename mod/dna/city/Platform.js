
const Body = require('dna/city/Body')

class Platform extends Body {

    constructor(st) {
        super( extend({
            team: 0,
            hull: 100,
        }, st) )
    }

    damage(force) {
        this.hull -= force
        if (this.hull <= 0) {
            kill(this)
        }
    }

    /*
    // platform in general MUST be hitless!!!
    hit(hitter) {
        if (hitter.force) {
            if (hitter.source !== this && (env.tune.friendlyFire || hitter.team !== this.team)) {
                this.damage(hitter.force)
                kill(hitter)
            }
        }
    }
    */
}
