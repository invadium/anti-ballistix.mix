function setup() {
    if (!env.debug) kill(this)
}

function evo(dt) {
    if (!env.debug) return

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
          bz = round(lab.overlord.battleZone.lz(my) * 100),
          bs = (bz < 0 || bz > 100)? `--[${bz}%]--` : `==[${bz}%]==`
    env.status = `${prefix}Scr[${mx}:${my}] >> Cam[${wx}:${wy}] >> BZz: ${bs}`
}
