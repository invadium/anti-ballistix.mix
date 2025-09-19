class MultiSolid {

    constructor(st) {
        extend(this, {
            type:      'pod',
            name:      'multiSolid',
            alias:     'solid',
        }, st)
    }

    onInstall() {
        const _ = this
        this._ls = this.__._ls.filter(e => e.type === 'solid' && e !== _)
    }

    contact(hitter, hitterSolid, resolveContact) {
        const ls = this._ls
        for (let i = ls.length - 1; i >= 0; i--) {
            const pod = ls[i]
            if (!pod.dead && !pod.disabled) {
                pod.contact(hitter, hitterSolid, resolveContact)
            }
        }
    }

    lineTouch(px, py, phi) {
        const ls = this._ls

        for (let i = ls.length - 1; i >= 0; i--) {
            const pod = ls[i]
            if (!pod.dead && !pod.disabled) {
                if ( pod.lineTouch(px, py, phi) ) return true
            }
        }

        return false
    }

}
