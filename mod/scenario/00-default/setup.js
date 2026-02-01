function setup() {
    log(`setting up scenario [${this.info.title}]`)

    // TODO move out to this.genRandomSource()
    const src = this.src = math.createRandomGenerator()
    this.src.setSeed(this.info.seed)

    this.genCity(this.info)
    this.genGrid(this.info)
    this.genPowerStations(this.info)
    this.genFlak(this.flaks)
}
