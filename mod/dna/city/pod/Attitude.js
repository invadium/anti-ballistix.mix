const FORWARD  = 1,
      BACKWARD = 2,
      LEFT     = 3,
      RIGHT    = 4

class Attitude {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'propulsion',
            name:    'attitude',

            neutral:         -HALF_PI,
            sector:          .9 * PI,
            turnVelocity:    .4 * PI,
        }, st)
    }

    min() {
        return this.neutral - .5 * this.sector
    }

    max() {
        return this.neutral + .5 * this.sector
    }

    atMin() {
        return this.__.dir === this.min()
    }

    atMax() {
        return this.__.dir === this.max()
    }

    left(dt) {
        this.__.dir = max(this.__.dir - this.turnVelocity * dt, this.neutral - .5 * this.sector)
    }

    right(dt) {
        this.__.dir = min(this.__.dir + this.turnVelocity * dt, this.neutral + .5 * this.sector)
    }
}
