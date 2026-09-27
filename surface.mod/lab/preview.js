const Z = 95

const B = 10

function testFill(ctx) {
    const w = ctx.w,
          h = ctx.h

    ctx.fillStyle = '#ffff00'
    ctx.fillRect(0, 0, .25 * w, .25 * h)
    ctx.fillRect(.75*w, .75*h, .25 * w, .25 * h)
}

function draw() {
    if (!$.env.showPreview) return
    const portal = lab,
          canvas = portal.canvas,
          ctx    = portal.ctx

    // testFill(ctx)

    const w = rx(.25)
    const h = ry(.25)
    const hb = ctx.width - w - B
    const vb = ctx.height - h - B
    // smooth()
    pixelated()
    image(portal.ctx.canvas, hb, vb, w, h)
}

