const Z = 1

const src = math.createRandomGenerator()

function init() {
    // TODO reinitialize with each new level with a new seed?
    src.setSeed(7512)
}

function draw() {
    const w = ctx.width,
          h = env.tune.horizonLine * ctx.height

    // === ground ===
    //fill('#2c0148')
    const groundGradient = ctx.createLinearGradient(0, h, 0, ctx.height)
    groundGradient.addColorStop( 0, '#3c1158')
    groundGradient.addColorStop(.7, '#1c0138')
    groundGradient.addColorStop( 1, '#0c0108')

    fill(groundGradient)
    rect(0, h, ctx.width, ctx.height - h)

    // === sky ===
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h)

    skyGradient.addColorStop( 0, '#0c0979')
    skyGradient.addColorStop(.5, '#6f0cc3') // purple middle
    skyGradient.addColorStop( 1, 'purple')

    //fill('#3c0197')
    fill(skyGradient)
    rect(0, 0, w, h)

    //background('#6f0cc3')
    //fill('#ff0000')
    //rect(0, 0, .5 * ctx.width, .5 * ctx.height)
}
