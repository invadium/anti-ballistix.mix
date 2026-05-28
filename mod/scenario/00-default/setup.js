function setup() {
    log(`setting up scenario [${this.info.title}]`)

    // TODO move out to this.genRandomSource()
    const src = this.src = math.createRandomGenerator()
    this.src.setSeed(this.info.seed)

    this.genSky(this.info)
    this.genCity(this.info)
    this.genGrid(this.info)
    lab.port.orderZ()

    this.genPowerStations(this.info)
    this.genFlak(this.flaks)
}
