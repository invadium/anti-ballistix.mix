const _menu = {
    DNA:    'hud/Menu',
    name:   'menu',
    warp:    false,
    shadow:  false,
    outline: false,

    adjust() {
        this.x = rx(.5)
        this.y = ry(.6)
        this.w = rx(.5)
        this.h = this.activeItems() * this.step
        this.zones = []
    }
}

