const Z = 11

const VGAP        = .02,
      VGAP_RATE   = 1.1,
      WIDTH_RATE  = 1.1,
      HRGAP       = 2,
      PERSPECTIVE = 7

function draw() {
    const W  = ctx.width,
          HW = .5 * W,
          H  = ctx.height,
          horizonY = coord.screen.horizonLineY()

    stroke(env.style.color.grid)

    let y = horizonY + 1,
        yStep = VGAP * H,
        width = 1
    while (y < H) {
        lineWidth(width)
        line(0, y, W, y)
        y += yStep
        yStep *= VGAP_RATE
        width *= WIDTH_RATE
    }

    let x = .5 * W,
        shift = 0,
        xStep = VGAP * H * HRGAP

    line(x, horizonY, x, H)
    while(shift < HW) {
        lineWidth(2)
        const pshift = shift * PERSPECTIVE
        line(HW-shift, horizonY, HW-pshift, H)
        line(HW+shift, horizonY, HW+pshift, H)

        x -= xStep
        shift += xStep
    }
}
