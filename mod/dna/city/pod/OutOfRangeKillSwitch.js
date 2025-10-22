class OutOfRangeKillSwitch {

    constructor(st) {
        augment(this, {
            type:    'pod',
            subtype: 'control',
            name:    'outOfRangeKillSwitch',

            lastTest: 0,
        }, st)
    }

    evo(dt) {
        if (env.time - this.lastTest < 1) return 
        this.lastTest = env.time

        const { __, r } = this
        const { x, y }  = __

        if (!lab.port.inView(x, y, r)) {
            kill(__)
        }
    }

}
