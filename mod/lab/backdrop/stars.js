const Z = 2

const STARS = 512

const catalog = []

function setup() {
    const src = this.__.sky.src
    
    for (let i = 0; i < STARS; i++) {
        catalog.push({
            x: round(src.rnds() * src.rnd(ctx.width)),
            y: round(-src.rnd(ctx.height)),
            magnitude: sqrt(1 + src.rnd(5)),
        })
    }
}

function draw() {
    save()
    // move to the horizon coordinate system
    const horizonY = env.tune.horizonLine * ctx.height
    translate(.5 * ctx.width, horizonY)

    const hazeY = -.5 * horizonY

    catalog.forEach(star => {
        if (star.y > hazeY) {
            const hazeFactor = star.y/hazeY
            fill( rgba(1, 1, .9, .2 + .6 * hazeFactor) )
        } else {
            fill( rgba(1, 1, .9, .8) )
        }
        circle(star.x, star.y, star.magnitude)
    })

    restore()
}
