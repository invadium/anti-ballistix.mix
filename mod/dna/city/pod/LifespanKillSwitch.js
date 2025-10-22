class LifespanKillSwitch {

    constructor(st) {
        augment(this, {
            type:    'pod',
            subtype: 'control',
            name:    'lifetimeKillSwitch',

            timer:    1,
        }, st)
    }


    evo(dt) {
        this.timer -= dt
        if (this.timer < 0) {
            kill(this.__)
        }
    }

}
