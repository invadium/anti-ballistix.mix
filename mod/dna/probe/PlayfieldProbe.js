// highlight the playfield area
// TODO is it a real thing? what is playfield and why it doesn't change with direction?
class PlayfieldProbe {

    constructor(st) {
        extend(this, {
            name: 'playfieldProbe',
        }, st)
    }

    draw() {
        const { width, height } = env.playfield
        lineWidth(2)
        stroke('#ffff00')
        rect(-.5 * width, -height, width, height)
    }

}
