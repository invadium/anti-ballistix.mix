const STATUS_REFRESH_TIME = 1

function setup() {
    if (!env.config.debug) kill(this)

    env.statusInfo = {}
}

let lastStatus = 0
function evoStatusInfo(dt) {
    const ls = lab.port._ls

    let bullets     = 0,
        deadBullets = 0
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (e instanceof dna.Projectile) {
            if (e.dead) deadBullets++
            else bullets++
        }
    }

    env.statusInfo.bullets = `${bullets}[--${deadBullets}--]`
    env.statusInfo.shots = `${lab.overlord.stat.getData().shots}`
    lastStatus = env.time
}

function evo(dt) {
    if (!env.debug) return

    if (env.time - lastStatus > STATUS_REFRESH_TIME) {
        evoStatusInfo(dt)
    }

    if (mouse.out) {
        env.status = ''
        return
    }

    const ls = []
    const last = lab.port.pick( mouse.x, mouse.y, ls )

    let prefix = ''
    if (last) {
        if (isFun(last.getStatus)) {
            prefix = last.getStatus() + ' | '
        } else if (last.status) {
            prefix = last.status + ' | '
        } else if (last.name) {
            prefix = last.name + ' | '
        }
    }

    const mx = round(mouse.x),
          my = round(mouse.y),
          wx = round(lab.port.lx(mouse.x)),
          wy = round(lab.port.ly(mouse.y)),
          sx = round(lab.port.sky.lx(wx)),
          sy = round(lab.port.sky.ly(wy)),
          gx = round(lab.port.ground.lx(wx)),
          gy = round(lab.port.ground.ly(wy)),
          zx = round(lab.port.battleground.lx(wx)),
          zy = round(lab.port.battleground.ly(wy)),
          bz = round(coord.battleZone.lz(my) * 100),
          bs = (bz < 0 || bz > 100)? `--[${bz}%]--` : `==[${bz}%]==`
    env.status = `${prefix}Scr[${mx}:${my}]`
            + ` >> Port[${wx}:${wy}]`
            + ` >> Sky[${sx}:${sy}]`
            + ` >> G[${gx}:${gy}]`
            + ` >> BG[${zx}:${zy}]`
            + ` >> BZz: ${bs}`
}
