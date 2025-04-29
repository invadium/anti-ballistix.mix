const Z = 1

function draw() {
    const w = ctx.width,
          h = env.tune.horizonLine * ctx.height

    const gradient = ctx.createLinearGradient(0, 0, 0, h)

    gradient.addColorStop( 0, '#0c0979')
    gradient.addColorStop(.5, '#6f0cc3') // purple middle
    gradient.addColorStop( 1, 'purple')

    //fill('#3c0197')
    fill(gradient)
    rect(0, 0, w, h)

    // ground
    fill('#2c0148')
    rect(0, h, ctx.width, ctx.height - h)
    //background('#6f0cc3')
    //fill('#ff0000')
    //rect(0, 0, .5 * ctx.width, .5 * ctx.height)
}
