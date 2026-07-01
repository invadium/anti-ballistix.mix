function mouseDown(e) {
    if (!env.debug) return

    if (e.ctrlKey && e.shiftKey) {
        // request a ballistic strike
        const px = round((e.x / lab.w) * 100)
        log(`spawning a ballistic missile at [%${px}]`)
        lab.overlord.waver.spawnBallistic(px)
    } else if (e.ctrlKey) {
        // dump coordinates
        const cam  = lab.port,
              wx   = floor(cam.lx(e.x)),
              wy   = floor(cam.ly(e.y)),
              pW   = floor(cam.width()),
              pH   = floor(cam.height()),
              // TODO why Y value is corrupted on that translation? We get the double z as a reault!!!
              // gpos = cam.grid.screenToGridBase(e.x, e.y)
              vy   = cam.grid.wyToVPY(wy), // quasi-normalized viewport Y
              gpos = cam.grid.backTrace(wx, vy)
        log(`screen/viewport: ${e.x}:${e.y} -- [${lab.w}:${lab.h}]`)
        log(`world: ${wx}:${wy} -- [${pW}:${pH}]`)
        log(`sky: ${at.sky.lx(wx) | 0}:${at.sky.ly(wy) | 0} -- [${at.sky.width() | 0}:${at.sky.height() | 0}]`)
        log(`ground: ${at.g.lx(wx) | 0}:${at.g.ly(wy) | 0} -- [${at.g.width() | 0}:${at.g.height() | 0}]`)
        log(`battleground: ${at.bg.lx(wx) | 0}:${at.bg.ly(wy) | 0} -- [${at.bg.width() | 0}:${at.bg.height() | 0}]`)
        log(`gridBase: ${round(gpos[0])}:${round(gpos[1])}:${round(gpos[2])}`)

        /*
        const dot = cam.grid.closestDot( gpos )
        if (dot) {
            dir(dot)
            if (dot.lead) dot.lead.elevate()
            else dot.elevate()
        }
        */
        const shockwave = cam.spawn('Shockwave', {
            x:    gpos[0],
            y:    gpos[1],
            z:    gpos[2],
        })

        // pick entities
        const ls = []
        lab.port.pick(e.x, e.y, ls)

        if (ls.length === 0) {
            log.raw('=== none ===')
        } else if (ls.length === 1) {
            log.dir(ls[0])
        } else {
            ls.forEach(n => log.dir(n))
        }
    }
}
