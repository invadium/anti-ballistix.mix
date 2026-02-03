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
            lastShot0:    0,
            lastShot1:    0,

            // spec
            rechargeTime: .2,
            heatFactor:   .015,
            coolFactor:   .15,
            blockTemp:    .9,
            lockTime:      3,
            spreadTemp:   .3,
            spreadFactor: .15,
            flashTime:    .25,
            flashRadius:   7,
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
        const fv = lib.vec2(y0, 0)
        const rm = lib.mat2()
        lib.mat2.rotate(rm, rm, dir)

        let ddx = 0, ddy = 0
        if (this.barrel === 0) {
            fv[1] = x1
            lib.vec2.mulM2(fv, fv, rm)
            this.barrel = 1
            this.lastShot0 = env.time
        } else {
            fv[1] = x2
            lib.vec2.mulM2(fv, fv, rm)
            this.barrel = 0
            this.lastShot1 = env.time
        }

        // calculate barrel overheat spread if needed
        let projectileDir = temp < this.spreadTemp? dir : dir + (math.rnds() * rnd() * temp * this.spreadFactor)
        const projectile = lab.port.spawn( dna.city.Projectile, {
            team:   this.__.team + 2,
            source: this.__,
            player: this.__.control._controllerId,
            x:      x + fv[0],
            y:      y + fv[1],
            dir:    projectileDir,
            temp:   temp,
        })
        env.stat.shot(projectile)
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
