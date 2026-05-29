function ballistic(args) {
    if (args[1]) {
        const px = parseInt(args[1])
        expect(px).isNumber()

        lab.overlord.waver.spawnBallistic(px)
    } else {
        lab.overlord.waver.spawnBallistic()
    }
    this.close()
}
ballistic.args = '([at])'
ballistic.info = 'launch a ballistic missile'
