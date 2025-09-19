class TargetingPod {

    constructor(st) {
        extend(this, {
            type: 'pod',
            name: 'targeting',
        }, st)
    }

    lockOnTarget() {
        const ls = lab.port._ls
        const { x, y, dir } = this.__

        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (e instanceof dna.city.PowerStation && !e.dead) {
                if (e.solid.lineTouch( x, y, dir )) {
                    // TODO introduce the targeting error here
                    log(`[${this.__.name}] locked on -> [${e.name}]`)
                    return e
                }
            }
        }
    }

}
