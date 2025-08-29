function hitDebris(x, y, Z, force, color) {
    const s = ry(.005)
    const emitter = lab.port.spawn(dna.Emitter, {
        Z: Z,
        x: x,
        y: y,
        color: color,
        lifespan: .1,
        force: 2500,
        radius: 0,
        //edge: 100*s,
        size: 1*s, vsize: 2*s,
        speed: 5*s, vspeed: 20*s,
        angle: PI, spread: PI,
        minLifespan: 0.5, vLifespan: 2,

        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        },

        moveParticle: function(dt) {
            this.dy += s * 12 * dt // gravity effect
            this.x += this.dx * dt
            this.y += this.dy * dt
        },
    })
    return emitter
}

