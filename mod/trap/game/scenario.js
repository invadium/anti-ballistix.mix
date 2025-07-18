function scenario(st) {
    // TODO find and setup the scenario
    // ...
    // hardcoded for now
    const scenarioConfig = $.sce._ls[0]

    lab.control.mission.newScenario(scenarioConfig)

    lab.control.state.transitTo('city', st)
}
