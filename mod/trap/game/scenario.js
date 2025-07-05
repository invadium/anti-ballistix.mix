function scenario(st) {
    // TODO find and setup the scenario
    // ...
    // hardcoded for now
    const scenarioConfig = $.sce._ls[0]

    lab.control.game.scenario(scenarioConfig)

    lab.control.state.transitTo('city', st)
}
