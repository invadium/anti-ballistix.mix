const Z = 5

function draw() {
    const w  = ctx.width,
          h  = ctx.height,
          cx = .5 * w,
          cy = .5 * h,
          cr = .15 * h,
          by = cy - cr

    save()
    clip(0, 0, w, .5 * h)

    const gradient = ctx.createLinearGradient(cx, by, cx, cy)

    gradient.addColorStop(0, "orange")
    gradient.addColorStop(1, "purple")

    fill(gradient)
    circle( cx, cy, cr )

    const strips = 5,
          step   = cr / (strips + 1),
          stripH = .2 * step
    let sy = by + step
    for (let i = 0; i < strips; i++) {
        fill('purple')
        rect(0, sy, w, stripH * (strips / (strips - i)))
        sy += step
    }

    restore()
}
