class TitleBar {

    constructor(st) {
        augment(this, {
            name: 'titleBar',
        }, st)
    }

    draw() {
        if (!lab.control.mission.hasStarted()) return

        const power = round(lab.overlord.power.getNormalPower() * 100)

        const f = env.style.font.titleBar
        const Y = .5 * f.size

        const wave = env.wave || 1

        font(f.head)
        baseTop()
        alignCenter()
        fill( hsl(.6, .8, .7) )

        text(`Wave:    ${wave}`, rx(.15), Y)
        text(`Power:   ${power}%`, rx(.35), Y)
        text(`Score:   ${env.score}`, rx(.65), Y)
        text(`Bounty:  $${env.balance}k`, rx(.85), Y)

        if (lab.port.paused) {
            let by = ry(.25)
            font(env.style.font.title.head)
            text('Game Paused', rx(.5), by)

            if ((env.realTime - env.pauseTimestamp) % 1 < .5) {
                by += 80
                font(env.style.font.titleBar.head)
                text('Press any Key to Continue', rx(.5), by)
            }
        }
    }
}
