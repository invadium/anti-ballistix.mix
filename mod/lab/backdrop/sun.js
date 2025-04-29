const Z = 5

function draw() {
    const w  = ctx.width,
          h  = ctx.height,
          sh = ctx.height * env.tune.horizonLine,
          gh = ctx.height - sh,
          cx = .5 * w,
          cy = sh,
          cr = .15 * h

    save()
    translate(cx, cy)
    clip(-.5 * w, -sh, w, sh)

    const gradient = ctx.createLinearGradient(0, -cr, 0, 0)

    gradient.addColorStop(0, "orange")
    gradient.addColorStop(1, "purple")

    fill(gradient)
    circle( 0, 0, cr )

    const cloudsGradient = ctx.createLinearGradient(0, -sh, 0, 0)
    cloudsGradient.addColorStop( 0, '#0c0979')
    cloudsGradient.addColorStop(.5, '#6f0cc3') // purple middle
    cloudsGradient.addColorStop( 1, 'purple')

    //fill('#3c0197')
    fill(cloudsGradient)

    const strips = 5,
          step   = cr / (strips + 1),
          stripH = .2 * step
    let sy = -cr + step
    for (let i = 0; i < strips; i++) {
        //fill('purple')
        rect(-.5 * w, sy, w, stripH * (strips / (strips - i)))
        sy += step
    }

    restore()
}
