function mouseDown(e) {
    if (env.debug && e.ctrlKey) {
        // dump coordinates
        const cam = lab.port,
              wx  = floor(cam.lx(e.x)),
              wy  = floor(cam.ly(e.y)),
              pW  = floor(cam.width()),
              pH  = floor(cam.height())
        log(`screen/viewport: ${e.x}:${e.y} -- [${lab.w}:${lab.h}]`)
        log(`world: ${wx}:${wy} -- [${pW}:${pH}]`)
        log(`sky: ${at.sky.lx(wx) | 0}:${at.sky.ly(wy) | 0} -- [${at.sky.width() | 0}:${at.sky.height() | 0}]`)
        log(`ground: ${at.g.lx(wx) | 0}:${at.g.ly(wy) | 0} -- [${at.g.width() | 0}:${at.g.height() | 0}]`)
        log(`battleground: ${at.bg.lx(wx) | 0}:${at.bg.ly(wy) | 0} -- [${at.bg.width() | 0}:${at.bg.height() | 0}]`)

        // pick entities
        const ls = []
        this.__.pick(e.x, e.y, ls)

        if (ls.length === 0) {
            log.raw('=== none ===')
        } else if (ls.length === 1) {
            log.dump(ls[0])
        } else {
            ls.forEach(n => log.dump(n))
        }
    }
}
