class TitleBar {

    constructor(st) {
        augment(this, {
            name: 'titleBar',
        }, st)
    }

    draw() {
        if (!lab.control.game.inProgress()) return

        const power = round(lab.overlord.power.getNormalPower() * 100)

        const f = env.style.font.titleBar
        const Y = .5 * f.size

        font(f.head)
        baseTop()
        alignCenter()
        fill( hsl(.6, .8, .7) )

        text(`Power:   ${power}%`, rx(.15), Y)
        text(`Score:   ${env.score}`, rx(.5), Y)
        text(`Balance: $${env.balance}k`, rx(.85), Y)
    }
}
