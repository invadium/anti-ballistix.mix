class Gun {

    constructor(st) {
        extend(this, {
            type:    'pod',
            subtype: 'weapon',
            name:    'gun',
            alias:   'primaryWeapon',

            triggered:    false,
            charge:       0,

            // spec
            rechargeTime: .25,
        }, st)
    }

    fire() {
        const { x, y, r2, dir } = this.__
        const dx = cos(dir),
              dy = sin(dir)

        lab.port.spawn( dna.city.Projectile, {
            team:   this.__.team + 2,
            source: this.__,
            x:      x + dx * r2,
            y:      y + dy * r2,
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
