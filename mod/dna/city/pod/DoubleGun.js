class DoubleGun {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'weapon',
            name:    'gun',
            alias:   'primaryWeapon',

            triggered:    false,
            charge:       0,
            barrel:       0,
            temp:         0,
            lock:         0,

            // spec
            rechargeTime: .2,
            heatFactor:   0.01,
            coolFactor:   0.15,
            blockTemp:    0.9,
            lockTime:     3,
            spreadTemp:   0.3,
            spreadFactor: .15,
        }, st)
    }

    fire() {
        if (this.lock) return
        if (this.temp >= this.blockTemp) {
            this.temp = 1
            this.lock = this.lockTime
            this.lockTimestamp = env.time
            return
        }
        this.temp += this.heatFactor

        const { x, y, r2, dir } = this.__
        const { x1, x2, y0, temp } = this
        const dx = cos(dir),
              dy = sin(dir)

        // barrel spread
        let ddx = 0, ddy = 0
        if (this.barrel === 0) {
            ddx = .5 * x1 * sin(dir)
            ddy = .5 * x1 * cos(dir)
            this.barrel = 1
        } else {
            ddx = .5 * x2 * sin(dir)
            ddy = .5 * x2 * cos(dir)
            this.barrel = 0
        }

        // calculate barrel overheat spread if needed
        let projectileDir = temp < this.spreadTemp? dir : dir + (math.rnds() * rnd() * temp * this.spreadFactor)
        lab.port.spawn( dna.city.Projectile, {
            team:   this.__.team + 2,
            source: this.__,
            x:      x + ddx + dx * y0,
            y:      y + ddy + dy * y0,
            dir:    projectileDir,
            temp:   temp,
        })
    }

    trigger() {
        this.triggered = true
    }

    stop() {
        this.triggered = false
    }

    evo(dt) {
        // recharge
        this.charge += dt

        if (this.lock) {
            // reduce lock
            this.lock = max(this.lock - dt, 0)
        }

        // trigger
        if (this.triggered) {
            if (this.charge >= this.rechargeTime) {
                this.fire()
                this.charge = 0
            }
        } else {
            // cool down
            this.temp = max(this.temp - this.coolFactor * dt, 0)
        }
    }
}
