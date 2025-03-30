class MultiSolid {

    constructor(st) {
        extend(this, {
            type:      'pod',
            name:      'multiSolid',
            alias:     'solid',
            noContact: true,
        }, st)
    }

    onInstall() {
        const _ = this
        this._ls = this.__._ls.filter(e => e.type === 'solid' && e !== _)
    }

    contact(hitter, hitterSolid, resolveContact) {
        const ls = this._ls
        for (let i = 0; i < ls.length; i++) {
            const pod = ls[i]
            if (!pod.dead && !pod.disabled) {
                pod.contact(hitter, hitterSolid, resolveContact)
            }
        }
    }

}
