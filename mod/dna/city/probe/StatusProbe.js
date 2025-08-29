class StatusProbe {

    constructor(st) {
        extend(this, {
            probe: true,
            type: 'probe',
            name: 'statusProbe',
            x:     0,
            y:     0,
            r:     20,
        }, st)
    }

    draw() {
        const status = this.__.status
        if (!status) return
        
        const r  = this.r,
              hr = 0.5 * r

        // assume we are at the body's origin
        save()
        // rotate back to normalize the attitude towards the viewport
        rotate(-this.__.dir)
        translate(this.x, this.y)

        fill('#ffff00')
        baseTop()
        alignRight()
        font(env.style.font.debug.head)
        text(status, 0, 0)

        restore()
    }

}
