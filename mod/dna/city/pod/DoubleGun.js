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

            // spec
            rechargeTime: .25,
        }, st)
    }

    fire() {
        const { x, y, r2, dir } = this.__
        const { x1, x2, y0 } = this
        const dx = cos(dir),
              dy = sin(dir)

        // spread
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


        lab.port.spawn( dna.city.Projectile, {
            team:   this.__.team + 2,
            source: this.__,
            x:      x + ddx + dx * y0,
            y:      y + ddy + dy * y0,
            dir:    dir,
        })
    }

    trigger() {
        this.triggered = true
    }

    stop() {
        this.triggered = false
    }

    evo(dt) {
        this.charge += dt

        if (this.triggered) {
            if (this.charge >= this.rechargeTime) {
                this.fire()
                this.charge = 0
            }
        }
    }
}
