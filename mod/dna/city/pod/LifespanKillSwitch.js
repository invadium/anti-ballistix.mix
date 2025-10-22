class LifespanKillSwitch {

    constructor(st) {
        augment(this, {
            type:    'pod',
            subtype: 'control',
            name:    'lifespanKillSwitch',

            timer:    1,
        }, st)
    }


    evo(dt) {
        this.timer -= dt
        if (this.timer < 0) {
            kill(this.__)
        }
    }

    respawn(st) {
        augment(this, {
            timer: 1,
        }, st)
    }

}
