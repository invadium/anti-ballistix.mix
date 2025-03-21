
const FQ = .25

function ballistic() {
    const viewport = lab.port.viewport()

    const m = lab.port.spawn(dna.city.BallisticMissile, {
        x: crx(10 + RND(80)),
        y: viewport.y,
        dir: .4 * PI + .2 * PI * rnd(),
    })

    log(`new missile @${m.x}:${m.y}`)
}

function evo(dt) {
    if (rnd() < FQ * dt) ballistic()
}

